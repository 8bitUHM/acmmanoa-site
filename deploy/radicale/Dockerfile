FROM python:3.12-slim
RUN pip install --no-cache-dir 'Radicale[bcrypt]==3.5.10' 'bcrypt==4.0.1'
RUN useradd --create-home radicale && mkdir /data && chown radicale:radicale /data
COPY config /etc/radicale/config
COPY bootstrap.py /bootstrap.py
USER radicale
EXPOSE 5232
ENTRYPOINT ["python", "/bootstrap.py"]
