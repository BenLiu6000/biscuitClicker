import socket
import time


class Server:
    port = 8000
    host = socket.gethostname()

    def run(self):

        s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)

        s.bind((self.host,self.port))
        s.listen(5)

        print(f"listening on port {self.port}")


        while True:
            conn, addr = s.accept()
            print(f"connection from {addr}")
            conn.send(bytes("yipee", encoding="utf8"))
            #code to run after connection made

server = Server()
server.run()

    
