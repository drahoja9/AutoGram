import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from backend import api
app = api.create_app()
app.run(host='0.0.0.0')
