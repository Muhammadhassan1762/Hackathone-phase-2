#!/usr/bin/env python3
"""
Script to check if the due_date column exists in the tasks table.
"""

import os
import sys
from sqlmodel import SQLModel, create_engine, text
from models.task import Task

# Add parent directory to path to import config
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import settings

# Create engine
engine = create_engine(settings.database_url)

def check_due_date_column():
    """Check if due_date column exists in tasks table."""
    with engine.connect() as conn:
        # Query to check columns in tasks table
        result = conn.execute(text("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'tasks'
            ORDER BY ordinal_position;
        """))

        columns = result.fetchall()

        print("Columns in 'tasks' table:")
        for col in columns:
            print(f"  - {col[0]}: {col[1]} (nullable: {col[2]})")

        # Check if due_date column exists
        column_names = [col[0] for col in columns]
        if 'due_date' in column_names:
            print("\n[DONE] 'due_date' column exists in the tasks table")
            # Find the specific due_date column info
            for col in columns:
                if col[0] == 'due_date':
                    print(f"   Type: {col[1]}, Nullable: {col[2]}")
                    break
        else:
            print("\n[MISSING] 'due_date' column is MISSING from the tasks table")
            print("   This explains why due dates are not being stored!")

        return 'due_date' in column_names

if __name__ == "__main__":
    print("Checking database schema for due_date column...")
    has_due_date = check_due_date_column()

    if not has_due_date:
        print("\nThe issue is that the 'due_date' column doesn't exist in the database!")
        print("You need to recreate the database or add the column manually.")