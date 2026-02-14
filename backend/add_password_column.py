"""
Script to add password_hash column to existing users table.
"""
from sqlalchemy import create_engine, text
from config import settings

# Create engine
engine = create_engine(settings.database_url)

# Add the password_hash column if it doesn't exist
with engine.connect() as conn:
    # Check if column exists first
    result = conn.execute(text("""
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'password_hash'
    """))

    if result.fetchone() is None:
        # Column doesn't exist, add it
        print("Adding password_hash column to users table...")
        conn.execute(text("ALTER TABLE users ADD COLUMN password_hash TEXT"))
        conn.commit()
        print("Password hash column added successfully!")
    else:
        print("Password hash column already exists.")

print("Database schema update completed.")