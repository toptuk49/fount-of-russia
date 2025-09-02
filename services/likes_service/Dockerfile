FROM python:3.12-alpine

WORKDIR /app

RUN apk add --no-cache \
    postgresql-dev \
    gcc \
    python3-dev \
    musl-dev \
    libffi-dev \
    curl

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "python manage.py migrate && uvicorn likes_service.asgi:application --host 0.0.0.0 --port 8000 --reload"]
