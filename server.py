"""
PulseWatch India - Local Development Server
Department of Artificial Intelligence & Data Science, S.A. Engineering College
"""

import http.server
import socketserver
import os
import sys
import webbrowser

PORT = 8000
DIRECTORY = os.path.join(os.path.dirname(__file__), "frontend", "web")

class PulseWatchHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def main():
    if not os.path.exists(DIRECTORY):
        print(f"Error: Directory '{DIRECTORY}' does not exist.")
        sys.exit(1)

    os.chdir(DIRECTORY)
    
    handler = PulseWatchHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print("=" * 60)
        print("  PulseWatch India - Localhost Development Server")
        print("=" * 60)
        print(f"  > Server running at: http://localhost:{PORT}/login.html")
        print(f"  > Web Root Directory: {DIRECTORY}")
        print("  > Press CTRL+C to stop the server.")
        print("=" * 60)
        
        # Open default browser automatically
        try:
            webbrowser.open(f"http://localhost:{PORT}/login.html")
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down PulseWatch Localhost Server...")
            httpd.server_close()

if __name__ == "__main__":
    main()
