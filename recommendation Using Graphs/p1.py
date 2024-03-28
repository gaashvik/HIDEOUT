import subprocess

# Replace with the actual path to your Gephi executable
gephi_path = r'C:\Program Files\Gephi-0.10.1\bin\gephi.exe'

# Replace with the path to your GEXF file
gexf_file = 'user_connections.gexf'

# Command to open Gephi and load the GEXF file
command = f'"{gephi_path}" --open "{gexf_file}"'

try:
    subprocess.Popen(command, shell=True)
    print("Opened Gephi with the GEXF file.")
except Exception as e:
    print(f"Failed to open Gephi: {str(e)}")
