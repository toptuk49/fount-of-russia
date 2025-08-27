FROM python:3.12
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV TZ=Europe/Moscow

WORKDIR /app
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

RUN apt-get install -y tzdata && \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000

CMD ["sh", "-c", "uvicorn backend.asgi:application --host 0.0.0.0 --port 8000 --reload"]
