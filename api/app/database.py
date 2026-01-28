import os
import time
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import OperationalError

from sqlalchemy import create_engine
# from sqlalchemy.pool import NullPool
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Fetch variables
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

# Construct the SQLAlchemy connection string
DATABASE_URL = f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}?sslmode=require"

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)
# If using Transaction Pooler or Session Pooler, we want to ensure we disable SQLAlchemy client side pooling -
# https://docs.sqlalchemy.org/en/20/core/pooling.html#switching-pool-implementations
# engine = create_engine(DATABASE_URL, poolclass=NullPool)


# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# DB_PATH = os.path.join(BASE_DIR, "..", "tasks.db")

# SQL_ALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"
# engine = create_engine(SQL_ALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# DEFAULT_DB_URL = 'postgresql+psycopg://user:password@db:5432/task_db'
# SQL_ALCHEMY_DB_URL = os.getenv('DATABASE_URL')
# SQL_ALCHEMY_DB_URL = SQL_ALCHEMY_DB_URL.replace("postgres://", "postgresql+psycopg://")

engine = None
for i in range(5):
    try:
        engine = create_engine(DATABASE_URL)
        # Attempting a dummy connecion to verify if DB is listening
        with engine.connect() as conn:
            break
    except OperationalError:
        print(f"Database not ready yet.... retrying in 20 seconds (Attempt {i+1}/5)")
        time.sleep(20)

if not engine:
    raise Exception("Could not connect to the database. Please check the database instance for any faults.")

# Test the connection
try:
    with engine.connect() as connection:
        print("Connection successful!")
except Exception as e:
    print(f"Failed to connect: {e}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()