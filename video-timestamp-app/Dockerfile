FROM node:18 as frontend-build
WORKDIR /app/frontend
COPY frontend/ .
RUN npm install
RUN npm run build

FROM python:3.10-slim
WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend
COPY --from=frontend-build /app/frontend/dist ./frontend-dist
COPY backend/main.py ./main.py

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
