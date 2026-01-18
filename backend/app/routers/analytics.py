from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models import ChartRequest
from app.services import data_service, ai_service

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        
        processed_data = await data_service.process_file(contents, file.filename)
        
        analysis = ai_service.generate_analysis(processed_data["summary"])
        
        return {
            "file_id": processed_data["file_id"],
            "suggestions": analysis.get("suggestions", [])
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Error en upload: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/get-chart-data")
async def get_chart_data(request: ChartRequest):
    try:
        data = data_service.get_aggregated_data(request.file_id, request.parameters)
        return {"data": data}
        
    except KeyError:
        raise HTTPException(status_code=404, detail="Sesión expirada")
    except ValueError as e:
        return {"data": [], "error": str(e)}
    except Exception as e:
        print(f"Error procesando datos: {e}")
        import traceback
        traceback.print_exc()
        return {"data": [], "error": str(e)}