import React, { useState, useEffect } from 'react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [loading, setLoading] = useState(true);

  // Utiliza la URL de implementación que ya teníamos
  const scriptURL = 'https://script.google.com/macros/s/AKfycby4Acnk3Ai089QYo8eBLLp-DOgkwCyhm4DXzENJbf8pKX-9y-HK29YgDP25IzzRslzYdw/exec';

  // 1. LEER el JSON desde Google Sheets al cargar el componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(scriptURL);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error al cargar el blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  /// 2. GUARDAR el JSON en Google Sheets cada vez que haya una modificación
  const saveToServer = async (updatedPosts) => {
    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ tipo: "actualizar_blog", datos: updatedPosts }),
      });
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // 3. Crear publicación (Máximo 250 caracteres)
  const handleCreatePost = () => {
    if (newPostText.trim() === '' || newPostText.length > 250) return;
    
    const newPost = {
      id: Date.now().toString(),
      text: newPostText,
      liked: 0,
      comments: []
    };
    
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setNewPostText('');
    saveToServer(updatedPosts);
  };

  // 4. Reacción de corazón (Solo 0 o 1)
  const toggleLike = (id) => {
    const updatedPosts = posts.map(post => {
      if (post.id === id) {
        return { ...post, liked: post.liked === 0 ? 1 : 0 };
      }
      return post;
    });
    setPosts(updatedPosts);
    saveToServer(updatedPosts);
  };

  // 5. Agregar comentario a un post (Máximo 100 caracteres)
  const handleAddComment = (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText || commentText.trim() === '' || commentText.length > 100) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          comments: [...post.comments, { id: Date.now().toString(), text: commentText }] 
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setCommentInputs({ ...commentInputs, [postId]: '' });
    saveToServer(updatedPosts);
  };

  if (loading) {
    return <div className="text-center text-white mt-10 text-lg font-semibold drop-shadow-md">Cargando publicaciones...</div>;
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6 py-6 px-4">
      
      {/* Caja de cristal para nueva publicación */}
      <div className="bg-white/30 backdrop-blur-md border border-white/40 p-4 rounded-2xl shadow-xl">
        <textarea
          maxLength={250}
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="¿Qué estás pensando? (Se permiten emojis 😊)"
          className="w-full bg-white/50 text-textoNormal p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-titulo resize-none"
          rows="3"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-semibold text-textoNormal/80">{newPostText.length}/250</span>
          <button onClick={handleCreatePost} className="bg-titulo text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-opacity">
            Publicar
          </button>
        </div>
      </div>

      {/* Feed interactivo de Publicaciones */}
      {posts.map(post => (
        <div key={post.id} className="bg-white/20 backdrop-blur-md border border-white/30 p-5 rounded-2xl shadow-lg flex flex-col gap-3">
          <p className="text-textoNormal text-lg break-words">{post.text}</p>
          
          <div className="flex items-center gap-2 border-t border-white/20 pt-2">
            <button onClick={() => toggleLike(post.id)} className="text-2xl transition-transform hover:scale-110">
              {post.liked === 1 ? '❤️' : '🤍'}
            </button>
            <span className="text-sm font-semibold">{post.liked}</span>
          </div>

          {/* Sección de Comentarios */}
          <div className="flex flex-col gap-2 mt-2">
            {post.comments.map((comment) => (
              <div key={comment.id} className="bg-white/40 p-2 rounded-lg text-sm text-textoNormal break-words">
                {comment.text}
              </div>
            ))}
            <div className="flex gap-2 mt-1">
              <input 
                type="text"
                maxLength={100}
                placeholder="Escribe un comentario..."
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                className="flex-1 bg-white/50 text-sm p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-titulo"
              />
              <button onClick={() => handleAddComment(post.id)} className="bg-inicioParrafo text-white px-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                Enviar
              </button>
            </div>
            <span className="text-xs font-semibold text-textoNormal/80 text-right">
              {(commentInputs[post.id] || '').length}/100
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}