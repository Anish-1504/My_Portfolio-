// ===== THEME =====
(function() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  window.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('themeBtn');
    if (btn) btn.textContent = saved === 'dark' ? '🌙' : '☀️';
  });
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = next === 'dark' ? '🌙' : '☀️';
}

// ===== MOBILE NAV =====
function toggleMobile() {
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.classList.toggle('open');
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(e) {
  const nav = document.getElementById('mobile-nav');
  const hamburger = document.querySelector('.hamburger');
  if (nav && hamburger && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// ===== PROJECT MODAL =====
const projects = {
  rag: {
    title: 'RAG AI Video Assistant',
    category: 'AI · NLP · LLM',
    overview: 'An AI-powered system that analyzes course video content using transcription and context-aware search. Users can ask natural language questions and receive precise answers linked to exact timestamps in the video.',
    points: [
      'Transcribed course video audio into timestamped segments using Whisper',
      'Generated semantic embeddings using bge-m3 model via Ollama (local inference)',
      'Implemented cosine similarity retrieval using scikit-learn for top-K chunk matching',
      'Pre-computed and cached embeddings using joblib for fast runtime performance',
      'Built prompt engineering pipeline to format answers with MM:SS timestamp links',
      'Used llama3.2 as the answer generation LLM — fully offline, no API keys required',
      'Designed for Python course videos enabling students to instantly find relevant content'
    ],
    tech: ['Python','Ollama','llama3.2','bge-m3','Whisper','scikit-learn','joblib','NumPy','NLP','RAG']
  },
  drone: {
    title: 'Drone Object Detection',
    category: 'Computer Vision · Deep Learning',
    overview: 'A real-time object detection system deployed on drone hardware that uses COCO dataset-trained models to identify and classify objects from aerial footage in real time.',
    points: [
      'Implemented real-time object detection pipeline using TensorFlow and OpenCV',
      'Used COCO dataset pre-trained models for multi-class object recognition',
      'Optimized inference pipeline for deployment on drone-mounted compute hardware',
      'Implemented Non-Maximum Suppression (NMS) for accurate bounding box prediction',
      'Integrated GPIO and servo control for physical drone response to detections',
      'Achieved real-time performance suitable for aerial surveillance use cases'
    ],
    tech: ['Python','TensorFlow','OpenCV','COCO Dataset','NMS','GPIO','PWM']
  },
  face: {
    title: 'Face Detection (YOLO)',
    category: 'Edge ML · Computer Vision',
    overview: 'A real-time face and object detection system built with YOLO architecture, optimized for deployment on edge devices like Raspberry Pi with minimal computational overhead.',
    points: [
      'Implemented YOLO-based object and face detection model for real-time inference',
      'Optimized the model pipeline for Raspberry Pi edge deployment',
      'Used Edge Impulse for model training and deployment workflow',
      'Achieved efficient inference with low-latency results on constrained hardware',
      'Integrated OpenCV for video stream capture and result visualization',
      'Applied quantization and pruning techniques for edge optimization'
    ],
    tech: ['Python','YOLO','Raspberry Pi','Edge Impulse','OpenCV','TensorFlow Lite']
  },
  housing: {
    title: 'Housing Price Analysis',
    category: 'Data Analysis · ML',
    overview: 'An end-to-end EDA and ML project that processes raw housing datasets to extract insights and build predictive models for property price estimation.',
    points: [
      'Performed comprehensive EDA to identify patterns, outliers, and correlations',
      'Applied data cleaning with Pandas — handled missing values, duplicates, and type errors',
      'Engineered new features to improve model predictive power',
      'Visualized distributions and correlations using Matplotlib and Seaborn',
      'Built and evaluated regression models using scikit-learn',
      'Extracted key insights about price drivers such as location, size, and amenities'
    ],
    tech: ['Python','Pandas','NumPy','Matplotlib','Seaborn','scikit-learn','EDA','Regression']
  }
};

function openModal(id) {
  const p = projects[id];
  if (!p) return;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-body').innerHTML = `
    <div class="modal-section">
      <h4>Category</h4>
      <p>${p.category}</p>
    </div>
    <div class="modal-section">
      <h4>Overview</h4>
      <p>${p.overview}</p>
    </div>
    <div class="modal-section">
      <h4>Key Highlights</h4>
      <ul>${p.points.map(pt => `<li>${pt}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <h4>Technologies Used</h4>
      <div class="modal-tags">${p.tech.map(t => `<span class="modal-tag">${t}</span>`).join('')}</div>
    </div>
  `;
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
