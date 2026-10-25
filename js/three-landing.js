/**
 * ============================================================
 * PROFIO - 3D HOLOGRAPHIC CYBER NET SCENE (Three.js)
 * Interactive 3D Tech Core & Constellation with 5 Team Nodes
 * ============================================================
 */

(function () {
  'use strict';

  var container, scene, camera, renderer;
  var coreGroup, particleSystem, ringsGroup, teamNodesGroup;
  var mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  var isVisible = true;
  var animFrameId = null;

  // Theme colors
  function getThemeColors() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      coreWire: isDark ? 0x00f2fe : 0x2563eb,
      coreInner: isDark ? 0x7928ca : 0x3b82f6,
      particles: isDark ? 0x38bdf8 : 0x2563eb,
      ring1: isDark ? 0x00f2fe : 0x3b82f6,
      ring2: isDark ? 0xa855f7 : 0x6366f1,
      teamNode: isDark ? 0x00ffcc : 0x10b981,
      lines: isDark ? 0x0ea5e9 : 0x93c5fd
    };
  }

  function initThree() {
    container = document.getElementById('hero-3d-canvas');
    if (!container || typeof THREE === 'undefined') return;

    var width = container.clientWidth || window.innerWidth;
    var height = container.clientHeight || 560;

    // 1. Scene & Camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 180;

    // 2. Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    var colors = getThemeColors();

    // 3. Central Hologram Core Group
    coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer Geosphere Wireframe
    var geoOuter = new THREE.IcosahedronGeometry(36, 2);
    var matOuter = new THREE.MeshBasicMaterial({
      color: colors.coreWire,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    var meshOuter = new THREE.Mesh(geoOuter, matOuter);
    coreGroup.add(meshOuter);

    // Inner Faceted Core
    var geoInner = new THREE.OctahedronGeometry(22, 1);
    var matInner = new THREE.MeshBasicMaterial({
      color: colors.coreInner,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    var meshInner = new THREE.Mesh(geoInner, matInner);
    coreGroup.add(meshInner);

    // Core Center Glow Point
    var coreLight = new THREE.PointLight(colors.coreWire, 2.5, 200);
    coreGroup.add(coreLight);

    // 4. Orbital Cyber Rings Group
    ringsGroup = new THREE.Group();
    coreGroup.add(ringsGroup);

    function createCyberRing(radius, tube, rotX, rotY, color) {
      var ringGeo = new THREE.TorusGeometry(radius, tube, 8, 80);
      var ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.7,
        wireframe: true
      });
      var ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    }

    var ring1 = createCyberRing(50, 0.4, Math.PI / 3, Math.PI / 6, colors.ring1);
    var ring2 = createCyberRing(62, 0.35, -Math.PI / 4, Math.PI / 4, colors.ring2);
    var ring3 = createCyberRing(74, 0.3, Math.PI / 2, 0, colors.coreWire);
    ringsGroup.add(ring1);
    ringsGroup.add(ring2);
    ringsGroup.add(ring3);

    // 5. 5 Orbiting Team Member Data Nodes
    teamNodesGroup = new THREE.Group();
    coreGroup.add(teamNodesGroup);

    var teamNodes = [];
    var teamData = [
      { name: 'Khang', role: 'Java Backend', color: 0x00f2fe, radius: 82, speed: 0.009, angle: 0 },
      { name: 'Member 2', role: 'Frontend', color: 0xa855f7, radius: 95, speed: 0.007, angle: (Math.PI * 2 / 5) * 1 },
      { name: 'Member 3', role: 'Fullstack', color: 0x00ffcc, radius: 88, speed: 0.008, angle: (Math.PI * 2 / 5) * 2 },
      { name: 'Member 4', role: 'UI/UX Dev', color: 0x38bdf8, radius: 102, speed: 0.006, angle: (Math.PI * 2 / 5) * 3 },
      { name: 'Member 5', role: 'Mobile / AI', color: 0xf43f5e, radius: 92, speed: 0.0075, angle: (Math.PI * 2 / 5) * 4 }
    ];

    teamData.forEach(function (node) {
      var nGroup = new THREE.Group();

      // Node Diamond/Cube
      var nGeo = new THREE.OctahedronGeometry(3.5, 0);
      var nMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: false
      });
      var nMesh = new THREE.Mesh(nGeo, nMat);

      // Node Halo Wireframe
      var hGeo = new THREE.SphereGeometry(6, 6, 6);
      var hMat = new THREE.MeshBasicMaterial({
        color: node.color,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      var hMesh = new THREE.Mesh(hGeo, hMat);

      nGroup.add(nMesh);
      nGroup.add(hMesh);

      teamNodesGroup.add(nGroup);
      teamNodes.push({
        group: nGroup,
        mesh: nMesh,
        halo: hMesh,
        data: node
      });
    });

    // 6. Ambient Constellation Particle Field (600 nodes)
    var particleCount = 450;
    var pGeometry = new THREE.BufferGeometry();
    var pPositions = new Float32Array(particleCount * 3);
    var pVelocities = [];

    for (var i = 0; i < particleCount; i++) {
      var x = (Math.random() - 0.5) * 360;
      var y = (Math.random() - 0.5) * 260;
      var z = (Math.random() - 0.5) * 280;

      pPositions[i * 3]     = x;
      pPositions[i * 3 + 1] = y;
      pPositions[i * 3 + 2] = z;

      pVelocities.push({
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.15
      });
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    // Simple canvas texture for rounded glowing particle dots
    var canvasDot = document.createElement('canvas');
    canvasDot.width = 16;
    canvasDot.height = 16;
    var ctxDot = canvasDot.getContext('2d');
    var grad = ctxDot.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(0,242,254,0.8)');
    grad.addColorStop(1, 'rgba(0,242,254,0)');
    ctxDot.fillStyle = grad;
    ctxDot.fillRect(0, 0, 16, 16);

    var pTexture = new THREE.CanvasTexture(canvasDot);

    var pMaterial = new THREE.PointsMaterial({
      color: colors.particles,
      size: 3.5,
      map: pTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particleSystem = new THREE.Points(pGeometry, pMaterial);
    scene.add(particleSystem);

    // 7. Mouse and Touch Interaction
    function onPointerMove(e) {
      var clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      var clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      targetX = (clientX - windowHalfX) * 0.25;
      targetY = (clientY - windowHalfY) * 0.25;
    }

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // Interactive Click Shockwave
    container.addEventListener('click', function () {
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(coreGroup.scale,
          { x: 1.25, y: 1.25, z: 1.25 },
          { x: 1, y: 1, z: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' }
        );
      } else {
        coreGroup.scale.set(1.2, 1.2, 1.2);
        setTimeout(function () { coreGroup.scale.set(1, 1, 1); }, 300);
      }
    });

    // Resize handler
    function onResize() {
      if (!container) return;
      var w = container.clientWidth || window.innerWidth;
      var h = container.clientHeight || 560;
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize, { passive: true });

    // Theme changes observer
    var observer = new MutationObserver(function () {
      var c = getThemeColors();
      meshOuter.material.color.setHex(c.coreWire);
      meshInner.material.color.setHex(c.coreInner);
      pMaterial.color.setHex(c.particles);
      ring1.material.color.setHex(c.ring1);
      ring2.material.color.setHex(c.ring2);
      ring3.material.color.setHex(c.coreWire);
      coreLight.color.setHex(c.coreWire);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Performance: Pause when not visible in viewport
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        isVisible = entries[0].isIntersecting;
      }, { threshold: 0.1 });
      io.observe(container);
    }

    // 8. Main Animation Loop
    var clock = new THREE.Clock();

    function animate() {
      animFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      var delta = clock.getDelta();
      var time = clock.getElapsedTime();

      // Smooth camera parallax
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;
      camera.position.x = mouseX * 0.6;
      camera.position.y = -mouseY * 0.6 + 8;
      camera.lookAt(0, 0, 0);

      // Core rotations
      meshOuter.rotation.y += 0.0035;
      meshOuter.rotation.x += 0.002;
      meshInner.rotation.y -= 0.006;
      meshInner.rotation.z += 0.004;

      // Pulse inner core scale
      var pulse = 1 + Math.sin(time * 2.5) * 0.06;
      meshInner.scale.set(pulse, pulse, pulse);

      // Rings spin at different angles
      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.006;
      ring3.rotation.y += 0.007;

      // Orbiting team nodes
      teamNodes.forEach(function (t) {
        t.data.angle += t.data.speed;
        var r = t.data.radius;
        t.group.position.x = Math.cos(t.data.angle) * r;
        t.group.position.z = Math.sin(t.data.angle) * r;
        t.group.position.y = Math.sin(t.data.angle * 2 + time) * 16;

        t.mesh.rotation.x += 0.03;
        t.mesh.rotation.y += 0.04;
        t.halo.rotation.z -= 0.02;
      });

      // Particle system subtle rotation
      particleSystem.rotation.y = time * 0.02;
      particleSystem.rotation.x = Math.sin(time * 0.015) * 0.08;

      renderer.render(scene, camera);
    }

    animate();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThree);
  } else {
    initThree();
  }
})();
