import React, { useState, useEffect, useRef } from 'react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Estado para mostrar u ocultar todos los comentarios
  const [showAllComments, setShowAllComments] = useState(true);
  
  // Referencias para la funcionalidad de Arrastrar y Soltar (Drag & Drop)
  const dragItem = useRef();
  const dragOverItem = useRef();

  // URL de tu base de datos en Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycby4Acnk3Ai089QYo8eBLLp-DOgkwCyhm4DXzENJbf8pKX-9y-HK29YgDP25IzzRslzYdw/exec';

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

  const handleCreatePost = () => {
    if (newPostText.trim() === '' || newPostText.length > 250) return;
    const newPost = {
      id: Date.now().toString(),
      text: newPostText,
      reactions: { love: 0, happy: 0, sad: 0, excited: 0, angry: 0, custom: 0 },
      comments: []
    };
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setNewPostText('');
    saveToServer(updatedPosts);
  };

  const toggleReaction = (postId, reactionType) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const currentReactions = post.reactions || { 
          love: post.liked || 0, happy: 0, sad: 0, excited: 0, angry: 0, custom: 0 
        };
        const newValue = currentReactions[reactionType] === 1 ? 0 : 1;
        return { ...post, reactions: { ...currentReactions, [reactionType]: newValue } };
      }
      return post;
    });
    setPosts(updatedPosts);
    saveToServer(updatedPosts);
  };

  const handleAddComment = (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText || commentText.trim() === '' || commentText.length > 100) return;
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, { id: Date.now().toString(), text: commentText }] };
      }
      return post;
    });
    setPosts(updatedPosts);
    setCommentInputs({ ...commentInputs, [postId]: '' });
    saveToServer(updatedPosts);
  };

  const handleSort = () => {
    let _posts = [...posts];
    const draggedItemContent = _posts.splice(dragItem.current, 1)[0];
    _posts.splice(dragOverItem.current, 0, draggedItemContent);
    
    dragItem.current = null;
    dragOverItem.current = null;
    
    setPosts(_posts);
    saveToServer(_posts);
  };

  if (loading) {
    return <div className="text-center text-white mt-10 text-lg font-semibold drop-shadow-md">Cargando tablero...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-2">
      
      {/* Botón superior para ocultar/mostrar comentarios */}
      <div className="flex justify-end px-4 mt-2">
        <button 
          onClick={() => setShowAllComments(!showAllComments)}
          className="flex items-center gap-2 bg-white/30 backdrop-blur-md border border-white/40 px-4 py-2 rounded-xl text-sm font-bold text-textoNormal shadow-lg hover:bg-white/50 transition-all z-20 relative"
        >
          {showAllComments ? '🙈 Ocultar Comentarios' : '💬 Mostrar Comentarios'}
        </button>
      </div>

      {/* Contenedor de publicaciones: 
        flex-col (móviles) -> Vertical
        md:flex-row (escritorio) -> Horizontal 
      */}
      <div className="w-full min-h-[70vh] flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-4 py-4 px-4 overflow-x-hidden md:overflow-x-auto custom-scrollbar pb-10">
        
        {/* Columna 1 fija: Crear nueva publicación */}
        {/* w-full en móviles, w-80 en escritorio */}
        <div className="w-full max-w-md md:max-w-none md:w-80 shrink-0 bg-white/30 backdrop-blur-md border border-white/40 p-4 rounded-2xl shadow-xl">
          <h2 className="text-titulo font-bold mb-3">Nueva Lista (Post)</h2>
          <textarea
            maxLength={350}
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="Escribe tu publicación aquí..."
            className="w-full bg-white/50 text-textoNormal p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-titulo resize-none"
            rows="4"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs font-semibold text-textoNormal/80">{newPostText.length}/350</span>
            <button onClick={handleCreatePost} className="bg-titulo text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-opacity">
              Añadir
            </button>
          </div>
        </div>

        {/* Columnas dinámicas de publicaciones */}
        {posts.map((post, index) => {
          const reacts = post.reactions || { love: post.liked || 0, happy: 0, sad: 0, excited: 0, angry: 0, custom: 0 };

          return (
            <div 
              key={post.id} 
              draggable
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              // Tarjeta adaptable: w-full max-w-md en móviles, w-80 en escritorio
              className="w-full max-w-md md:max-w-none md:w-80 shrink-0 bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-2xl shadow-lg flex flex-col gap-3 cursor-grab active:cursor-grabbing"
            >
              <div className="flex justify-between items-center border-b border-white/20 pb-2 mb-1">
                <span className="text-xs text-textoNormal/60 font-bold uppercase tracking-wider">Post ID: {post.id.slice(-4)}</span>
                <span className="text-textoNormal/50 text-lg cursor-grab">⋮⋮</span>
              </div>

              <p className="text-textoNormal text-base break-words font-medium">{post.text}</p>
              
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button onClick={() => toggleReaction(post.id, 'love')} className="flex items-center gap-1 hover:scale-110">
                  <span className={reacts.love ? '' : 'grayscale opacity-60'}>❤️</span>
                  <span className="text-xs font-bold text-textoNormal">{reacts.love}</span>
                </button>
                <button onClick={() => toggleReaction(post.id, 'happy')} className="flex items-center gap-1 hover:scale-110">
                  <span className={reacts.happy ? '' : 'grayscale opacity-60'}>😂</span>
                  <span className="text-xs font-bold text-textoNormal">{reacts.happy}</span>
                </button>
                <button onClick={() => toggleReaction(post.id, 'sad')} className="flex items-center gap-1 hover:scale-110">
                  <span className={reacts.sad ? '' : 'grayscale opacity-60'}>😢</span>
                  <span className="text-xs font-bold text-textoNormal">{reacts.sad}</span>
                </button>
                <button onClick={() => toggleReaction(post.id, 'custom')} className="flex items-center gap-1 hover:scale-110 ml-auto">
                  <img 
                    src="/assets/moneda1millon.gif" 
                    alt="Custom" 
                    className={`w-5 h-5 object-cover rounded-full shadow-sm ${reacts.custom ? 'ring-2 ring-titulo' : 'opacity-60'}`}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <span className="text-xs font-bold text-textoNormal">{reacts.custom}</span>
                </button>
              </div>

              {/* Si showAllComments es verdadero, renderizamos esta sección */}
              {showAllComments && (
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex flex-col gap-2 bg-white/10 p-2 rounded-xl border border-white/20 shadow-inner flex-1 overflow-y-auto max-h-60 custom-scrollbar">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="bg-white/60 p-2 rounded-lg shadow-sm border-l-4 border-titulo flex items-start gap-2 break-words">
                        <span className="text-sm leading-none mt-0.5">💬</span>
                        <p className="text-xs text-textoNormal m-0 leading-tight flex-1">{comment.text}</p>
                      </div>
                    ))}
                    {post.comments.length === 0 && (
                      <p className="text-xs text-textoNormal/60 italic text-center py-2">Sin tarjetas.</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-white/20">
                    <input 
                      type="text"
                      maxLength={150}
                      placeholder="Añadir tarjeta..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      className="w-full bg-white/50 text-xs py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-titulo placeholder-textoNormal/60"
                    />
                    <button onClick={() => handleAddComment(post.id)} className="bg-inicioParrafo text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:opacity-90 w-full shadow-md">
                      Añadir
                    </button>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}