import libs.postgresTool as pgt
import hashlib

# gerar senha hash
senha = "pelai123"
senha_bytes = senha.encode('utf-8')
hash_object = hashlib.sha256(senha_bytes)

usuario = "pelai"
senha_hash = hash_object.hexdigest()
email = "pelai@gmail.com"

# Execute the SQL queries
query = f"""INSERT INTO public.usuario (usuario, senha, email, exclusao, redefinir, ultima_modificacao, data_exclusao)
            VALUES ('{usuario}', '{senha_hash}', '{email}', NULL, NULL, current_timestamp, NULL);"""

print(query)
pgt.execute_query_psycopg2(query)
