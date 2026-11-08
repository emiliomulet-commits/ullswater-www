# Posts de LinkedIn a partir de las noticias

Las noticias de news.ullswaterinvestments.com se convierten en posts para la página de LinkedIn de Ullswater Investments
(linkedin.com/company/ullswater-investments).

- `posts.json`: registro de cada noticia ya tratada (drafted / published / skipped) y el texto del post. Evita duplicados.
- Una tarea programada de Claude (días laborables, mañana) lee el feed RSS, prepara en español el post de cada noticia nueva,
  lo añade aquí como `drafted` y avisa a Emilio. Emilio aprueba y Claude lo publica desde Chrome; entonces pasa a `published`.

Estilo de los posts: español (audiencia mayoritariamente en España); nombres oficiales de programas e instrumentos sin traducir;
gancho con la noticia y la fecha clave; 2–4 viñetas 🔹 con datos; "¿Por qué importa?" en 2–3 frases;
👉 enlace a la noticia; llamada a la acción breve; 5–7 hashtags (#FondosEuropeos siempre). Sin inventar datos: solo lo que dice la noticia.
