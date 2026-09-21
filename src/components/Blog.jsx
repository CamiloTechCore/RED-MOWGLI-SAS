import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Componente Modal estilo Facebook
function PostModal({ post, isOpen, onClose, onAddComment, onToggleReaction }) {
  const [commentText, setCommentText] = useState('');
  const reacts = post?.reactions || { love: 0, happy: 0, sad: 0, excited: 0, angry: 0, custom: 0 };

  if (!isOpen || !post) return null;

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header del Modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Post</h2>
          <button 
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Contenido del Post */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Post Content */}
          <div className="p-4 border-b border-gray-100">
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: post.text }} />
          </div>

          {/* Reacciones */}
          <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-gray-100">
            <button onClick={() => onToggleReaction(post.id, 'love')} className="flex items-center gap-1 hover:scale-110 transition">
              <span className={reacts.love ? '' : 'grayscale opacity-60'}>❤️</span>
              <span className="text-sm font-bold text-gray-700">{reacts.love}</span>
            </button>
            <button onClick={() => onToggleReaction(post.id, 'happy')} className="flex items-center gap-1 hover:scale-110 transition">
              <span className={reacts.happy ? '' : 'grayscale opacity-60'}>😂</span>
              <span className="text-sm font-bold text-gray-700">{reacts.happy}</span>
            </button>
            <button onClick={() => onToggleReaction(post.id, 'sad')} className="flex items-center gap-1 hover:scale-110 transition">
              <span className={reacts.sad ? '' : 'grayscale opacity-60'}>😢</span>
              <span className="text-sm font-bold text-gray-700">{reacts.sad}</span>
            </button>
            <button onClick={() => onToggleReaction(post.id, 'custom')} className="flex items-center gap-1 hover:scale-110 transition ml-auto">
              <img 
                src="/assets/moneda1millon.gif" 
                alt="Custom" 
                className={`w-6 h-6 object-cover rounded-full shadow-sm ${reacts.custom ? 'ring-2 ring-blue-500' : 'opacity-60'}`}
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <span className="text-sm font-bold text-gray-700">{reacts.custom}</span>
            </button>
          </div>

          {/* Comentarios */}
          <div className="p-4 space-y-4">
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                    💬
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-xl p-3">
                    <p className="text-sm font-semibold text-gray-800">Usuario</p>
                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 italic py-4">Sin comentarios aún</p>
            )}
          </div>
        </div>

        {/* Input de Comentarios */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            <input 
              type="text"
              maxLength={250}
              placeholder="Escribe un comentario..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSubmitComment}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold transition"
            >
              📤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [postStatus, setPostStatus] = useState('idle');
  const [commentStatus, setCommentStatus] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwKQGVx4zNOFeQ-gyByCwuw34iVQEW60wekOPHbsIY4kCnnu6Mmtg0A7VSptX6y81jghA/exec';

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

  const handleCreatePost = async () => {
    if (newPostText.trim() === '' || newPostText.length > 5000) return;
    
    setPostStatus('loading');

    const newPost = {
      id: Date.now().toString(),
      text: newPostText,
      reactions: { love: 0, happy: 0, sad: 0, excited: 0, angry: 0, custom: 0 },
      comments: []
    };
    const updatedPosts = [newPost, ...posts];
    
    setPosts(updatedPosts);
    setNewPostText('');
    
    await saveToServer(updatedPosts);
    
    setPostStatus('success');
    setTimeout(() => setPostStatus('idle'), 2000);
  };

  const toggleReaction = (postId, reactionType) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const currentReactions = post.reactions || { 
          love: 0, happy: 0, sad: 0, excited: 0, angry: 0, custom: 0 
        };
        const newValue = currentReactions[reactionType] === 1 ? 0 : 1;
        return { ...post, reactions: { ...currentReactions, [reactionType]: newValue } };
      }
      return post;
    });
    setPosts(updatedPosts);
    saveToServer(updatedPosts);
    
    // Actualizar post seleccionado si está abierto en el modal
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(updatedPosts.find(p => p.id === postId));
    }
  };

  const handleAddComment = async (postId, commentText) => {
    if (!commentText || commentText.trim() === '' || commentText.length > 250) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, { id: Date.now().toString(), text: commentText }] };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    await saveToServer(updatedPosts);
    
    // Actualizar post seleccionado si está abierto en el modal
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(updatedPosts.find(p => p.id === postId));
    }
  };

  if (loading) {
    return <div className="text-center text-gray-800 mt-10 text-lg font-semibold drop-shadow-md">Cargando tablero...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-Pink-50 to-Orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pensamientos en conjunto</h1>
          <p className="text-gray-600">Comparte tus pensamientos con tu amorcito</p>
        </div>

        {/* Editor de Nueva Nota */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border-2 border-white-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">✍️ Crear un Sueño</h2>
          
          {/* Contador de caracteres */}
          <div className="mb-2 text-right">
            <span className="text-sm text-gray-600 font-semibold">{newPostText.replace(/<[^>]*>/g, '').length}/5000</span>
          </div>

          {/* Editor Quill */}
          <ReactQuill 
            value={newPostText}
            onChange={setNewPostText}
            placeholder="Escribe tu nota aquí... Puedes usar negrita, cursiva, listas y más"
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['clean']
              ]
            }}
            className="bg-gray-50 rounded-lg text-gray-800 mb-4"
          />

          {/* Botón */}
          <div className="flex justify-end">
            <button 
              onClick={handleCreatePost} 
              disabled={postStatus === 'loading' || !newPostText.trim()}
              className={`px-6 py-3 rounded-lg text-white font-bold shadow-md transition-all ${
                postStatus === 'loading' ? 'bg-gray-400 cursor-not-allowed animate-pulse' : 
                postStatus === 'success' ? 'bg-green-500' : 
                !newPostText.trim() ? 'bg-gray-400 cursor-not-allowed' :
                'bg-pink-600 hover:bg-pink-500 active:scale-95'
              }`}
            >
              {postStatus === 'loading' ? '📤 Publicando...' : postStatus === 'success' ? '✅ ¡Publicado!' : '📤 Publicar sueño juntos'}
            </button>
          </div>
        </div>

        {/* Grid 3x3 de Notas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const reacts = post.reactions || { love: 0, happy: 0, sad: 0, excited: 0, angry: 0, custom: 0 };
            
            return (
              <div 
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  setIsModalOpen(true);
                }}
                className="h-96 bg-yellow-100 rounded-lg shadow-xl p-5 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-white-300 hover:border-red-400 relative overflow-hidden"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #f59be1 0%, #fffeff 100%)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset -2px -2px 5px rgba(0,0,0,0.1)'
                }}
              >
                {/* Efecto de papel arrugado */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl"></div>

                {/* Contenido */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header con ID */}
                  <div className="text-xs font-bold text-gray-600 opacity-60 mb-2 uppercase tracking-wider">
                    ID: {post.id.slice(-4)}
                  </div>

                  {/* Texto del post */}
                  <div className="flex-1 overflow-hidden mb-3">
                    <div className="prose prose-sm max-w-none text-gray-800 line-clamp-6" dangerouslySetInnerHTML={{ __html: post.text }} />
                  </div>

                  {/* Reacciones minimizadas */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t-2 border-yellow-300">
                    {reacts.love > 0 && <span title={`${reacts.love} ❤️`}>❤️ {reacts.love}</span>}
                    {reacts.happy > 0 && <span title={`${reacts.happy} 😂`}>😂 {reacts.happy}</span>}
                    {reacts.sad > 0 && <span title={`${reacts.sad} 😢`}>😢 {reacts.sad}</span>}
                    {reacts.custom > 0 && <span title={`${reacts.custom} 💰`}>💰 {reacts.custom}</span>}
                    <span className="ml-auto text-xs text-gray-600">
                      💬 {post.comments.length}
                    </span>
                  </div>

                  {/* Hint al pasar el mouse */}
                  <div className="absolute bottom-2 right-2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    👆 Haz clic para ver más
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje cuando no hay posts */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-3xl mb-2">📭</p>
            <p className="text-gray-600 text-lg">No hay notas aún. ¡Crea la primera!</p>
          </div>
        )}
      </div>

      {/* Modal de Post */}
      <PostModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddComment={handleAddComment}
        onToggleReaction={toggleReaction}
      />
    </div>
  );
}