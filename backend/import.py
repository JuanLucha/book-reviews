from sqlalchemy import create_engine

conn_string = "postgres://opplqhbestjfch:fb76f1edbbc26da3fb7f31adbc752f3354d7b4726b91452eba17c20a5ace5d72@ec2-50-17-250-38.compute-1.amazonaws.com:5432/dea1fj8vq9cn8j"

conn = create_engine(conn_string)

conn.execute("CREATE TABLE IF NOT EXISTS users (username VARCHAR(50), password VARCHAR(300), email VARCHAR(200), id SERIAL PRIMARY KEY)")  
