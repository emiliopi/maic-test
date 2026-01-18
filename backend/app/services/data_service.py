import pandas as pd
import io
import uuid
from typing import Dict

data_store: Dict[str, pd.DataFrame] = {}

async def process_file(file_contents: bytes, filename: str) -> dict:
    file_bytes = io.BytesIO(file_contents)

    if filename.endswith('.csv'):
        df = pd.read_csv(file_bytes)
    elif filename.endswith(('.xls', '.xlsx')):
        df = pd.read_excel(file_bytes, engine='openpyxl')
    else:
        raise ValueError("Formato no soportado")

    df.columns = df.columns.astype(str).str.strip()
    
    new_columns = []
    seen_columns = {}
    
    for col in df.columns:
        if col in seen_columns:
            seen_columns[col] += 1
            new_name = f"{col}_{seen_columns[col]}"
            new_columns.append(new_name)
        else:
            seen_columns[col] = 0
            new_columns.append(col)
    
    df.columns = new_columns

    df = df.dropna(how='all')
    df = df.fillna(0)
    
    file_id = str(uuid.uuid4())
    data_store[file_id] = df
    
    buffer = io.StringIO()
    df.info(buf=buffer)
    info_str = buffer.getvalue()
    stats_str = df.describe(include='all').to_string() 
    head_str = df.head().to_string()
    
    summary = f"""
    INFORMACIÓN TÉCNICA:
    {info_str}
    ESTADÍSTICAS:
    {stats_str}
    MUESTRA:
    {head_str}
    """
    
    return {"file_id": file_id, "summary": summary}

def get_aggregated_data(file_id: str, parameters: dict):
    if file_id not in data_store:
        raise KeyError("Sesión expirada")
    
    df = data_store[file_id]
    x = parameters.get("x_axis")
    y = parameters.get("y_axis")
    agg = parameters.get("aggregation", "sum")

    if x not in df.columns:
        raise ValueError(f"Columna '{x}' no encontrada")

    grouped_series = None
    y_final_name = y

    if agg == 'count' or (y and y not in df.columns):
        grouped_series = df[x].value_counts()
        y_final_name = y if y else "Conteo"
    else:
        df[y] = pd.to_numeric(df[y], errors='coerce').fillna(0)
        
        if agg == 'avg':
            grouped_series = df.groupby(x)[y].mean()
        else:
            grouped_series = df.groupby(x)[y].sum()
        
        y_final_name = y

    grouped_series = grouped_series.sort_values(ascending=False).head(20)

    data = []
    for index_val, metric_val in grouped_series.items():
        data.append({
            x: index_val,
            y_final_name: metric_val
        })

    return data