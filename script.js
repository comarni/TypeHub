// TypeHub — Lógica Principal v2.0

(function () {
  'use strict';

  // ========== BANCO DE PALABRAS ==========
  const WORD_BANKS = {
    es: {
      '1k': ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son',
        'con', 'para', 'una', 'hay', 'fue', 'ser', 'del', 'al', 'las', 'los', 'muy', 'me', 'si', 'mi', 'ya',
        'todo', 'esta', 'pero', 'más', 'como', 'sus', 'cuando', 'bien', 'puede', 'tiempo', 'casa', 'vida',
        'lado', 'modo', 'agua', 'noche', 'día', 'libro', 'mano', 'cara', 'calle', 'hora', 'mundo', 'gente',
        'forma', 'cosa', 'parte', 'lugar', 'caso', 'algo', 'cada', 'entre', 'año', 'otro', 'tanto', 'mismo'],
      '5k': ['absurdo', 'abierto', 'acción', 'actual', 'agente', 'alcanzar', 'ambiente', 'amor', 'análisis',
        'anterior', 'área', 'arte', 'aspecto', 'balance', 'barrio', 'base', 'batalla', 'caída', 'calidad',
        'cambio', 'camino', 'capital', 'causa', 'centro', 'ciencia', 'color', 'columna', 'comando', 'común',
        'concepto', 'condición', 'configurar', 'conjunto', 'contenido', 'control', 'correcto', 'crisis',
        'cultura', 'datos', 'debate', 'decisión', 'declarar', 'define', 'dificultad', 'digital', 'dirección',
        'diseño', 'dominio', 'economía', 'equipo', 'escena', 'estructura', 'evento', 'evolución', 'factura',
        'familia', 'final', 'física', 'flujo', 'fondo', 'fuerza', 'función', 'gestión', 'global', 'gobierno',
        'historia', 'humano', 'imagen', 'impacto', 'inicio', 'integrar', 'interés', 'interfaz', 'lenguaje',
        'lógica', 'manera', 'mercado', 'método', 'modelo', 'momento', 'motor', 'movimiento', 'nivel', 'nodo',
        'objeto', 'objetivo', 'opción', 'operación', 'orden', 'patrón', 'período', 'permiso', 'proceso',
        'producto', 'programa', 'proyecto', 'protocolo', 'prueba', 'punto', 'razón', 'recurso', 'red',
        'relación', 'resultado', 'riesgo', 'sistema', 'solución', 'servidor', 'servicio', 'situación',
        'tarea', 'técnica', 'tecnología', 'texto', 'tipo', 'trabajo', 'usuario', 'valor', 'variable', 'ventaja'],
      '20k': ['abandonar', 'abarcar', 'abertura', 'abisal', 'abismo', 'abolición', 'acaparar', 'aceleración',
        'acentuado', 'aceptación', 'aclaración', 'acomodación', 'adaptación', 'adicional',
        'administración', 'adquisición', 'adversario', 'afirmación', 'agotamiento', 'alineación', 'alternativa',
        'amplificar', 'anónimo', 'anticipar', 'aparición', 'aproximación', 'arbitrario', 'arquitectura',
        'articulación', 'asignación', 'automatización', 'biodiversidad', 'calibración', 'categorización',
        'circunstancia', 'clasificación', 'colaboración', 'competitividad', 'complejidad', 'comprensión',
        'comunicación', 'concentración', 'consecuencia', 'consideración', 'consolidación', 'constitución',
        'contingencia', 'convergencia', 'coordinación', 'corporativo', 'correspondencia', 'dependencia',
        'derivado', 'descripción', 'desarrollar', 'determinación', 'diferenciación', 'distribución',
        'diversificación', 'documentación', 'elaboración', 'emergente', 'emprendimiento', 'equilibrio',
        'especialización', 'establecimiento', 'estrategia', 'expectativa', 'experiencia', 'explicación',
        'exploración', 'facilitar', 'financiamiento', 'fragmentación', 'fundamental', 'generalización',
        'implementación', 'implicación', 'independencia', 'infraestructura', 'innovación', 'institucional',
        'integración', 'interacción', 'interpretación', 'investigación', 'justificación', 'legitimidad',
        'liberalización', 'mantenimiento', 'maximización', 'mecanismo', 'mejorar', 'monitorización',
        'negociación', 'normativa', 'optimización', 'organización', 'participación', 'perspectiva',
        'planificación', 'posicionamiento', 'potencial', 'presentación', 'priorización', 'profesional',
        'profundizar', 'proporcional', 'racionalidad', 'reconocimiento', 'regeneración', 'regulación',
        'representación', 'restructuración', 'retroalimentación', 'satisfacción', 'segmentación',
        'sostenibilidad', 'transformación', 'transparencia', 'ubicación', 'verificación', 'visualización']
    },
    en: {
      '1k': ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with',
        'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her',
        'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up',
        'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time',
        'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could'],
      '5k': ['ability', 'access', 'account', 'action', 'active', 'activity', 'actually', 'addition',
        'address', 'advance', 'advantage', 'affect', 'agency', 'agent', 'agree', 'allow', 'already',
        'always', 'analysis', 'apply', 'approach', 'area', 'argument', 'around', 'assign', 'authority',
        'available', 'avoid', 'balance', 'based', 'behavior', 'better', 'between', 'build', 'button',
        'cache', 'call', 'change', 'class', 'click', 'close', 'code', 'color', 'column', 'common',
        'complete', 'complex', 'concept', 'condition', 'config', 'connect', 'consider', 'contain',
        'control', 'convert', 'correct', 'create', 'critical', 'current', 'cycle', 'data', 'debug',
        'decision', 'define', 'delete', 'deploy', 'detect', 'develop', 'different', 'digital', 'display',
        'divide', 'domain', 'drive', 'effort', 'enable', 'entity', 'error', 'event', 'every', 'execute',
        'exist', 'explain', 'export', 'extend', 'factor', 'feature', 'field', 'filter', 'final', 'find',
        'format', 'frame', 'function', 'global', 'group', 'handle', 'impact', 'import', 'improve',
        'index', 'input', 'install', 'iterate', 'layer', 'length', 'level', 'limit', 'linear', 'link',
        'local', 'logic', 'manage', 'memory', 'message', 'method', 'module', 'monitor', 'move', 'network',
        'object', 'option', 'output', 'package', 'parse', 'pattern', 'point', 'process', 'produce',
        'program', 'project', 'protocol', 'provide', 'query', 'queue', 'reduce', 'remove', 'render',
        'report', 'request', 'require', 'reset', 'resolve', 'return', 'route', 'running', 'screen',
        'search', 'select', 'server', 'service', 'session', 'signal', 'simple', 'source', 'stack',
        'state', 'status', 'store', 'string', 'style', 'submit', 'support', 'system', 'target', 'task',
        'token', 'track', 'trigger', 'type', 'update', 'user', 'valid', 'value', 'version', 'window'],
      '20k': ['abandonment', 'abstraction', 'acceleration', 'accumulation', 'acknowledgment', 'adaptation',
        'administration', 'advancement', 'adversarial', 'aggregation', 'algorithmic', 'alienation',
        'allocation', 'amplification', 'annotation', 'anticipation', 'approximation', 'architecture',
        'articulation', 'assimilation', 'asynchronous', 'authentication', 'authorization', 'automation',
        'benchmarking', 'bidirectional', 'bureaucratic', 'calibration', 'categorization', 'centralization',
        'clarification', 'classification', 'collaboration', 'commercialization', 'communication',
        'compatibility', 'compilation', 'complementary', 'comprehension', 'computation', 'configuration',
        'consolidation', 'containerization', 'contingency', 'conversation', 'coordination', 'correlation',
        'customization', 'decentralization', 'decomposition', 'delegation', 'demonstration', 'dependency',
        'deployment', 'description', 'deterioration', 'differentiation', 'digitalization', 'documentation',
        'elaboration', 'encapsulation', 'engineering', 'establishment', 'evaluation', 'experimentation',
        'explanation', 'extrapolation', 'facilitation', 'fragmentation', 'generalization', 'implementation',
        'indeterminate', 'infrastructure', 'initialization', 'interpretation', 'investigation',
        'justification', 'linearization', 'localization', 'maintenance', 'maximization', 'methodology',
        'minimization', 'modernization', 'monitoring', 'normalization', 'optimization', 'organization',
        'parallelization', 'parameterization', 'participation', 'penetration', 'performance', 'persistence',
        'personalization', 'prioritization', 'professionalization', 'propagation', 'rationalization',
        'reconciliation', 'reconfiguration', 'restructuring', 'segmentation', 'serialization',
        'specialization', 'standardization', 'synchronization', 'transformation', 'transparency',
        'visualization', 'vulnerability', 'decoupling', 'orchestration', 'containerization']
    },
    fr: {
      '1k': ['le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'en', 'est', 'que', 'il', 'elle',
        'se', 'pas', 'je', 'on', 'ce', 'qui', 'au', 'par', 'mon', 'son', 'si', 'sur', 'avec', 'mais',
        'dans', 'nous', 'pour', 'vous', 'tout', 'bien', 'plus', 'faire', 'être', 'avoir', 'dire', 'voir'],
      '5k': ['aborder', 'accord', 'action', 'actuel', 'agent', 'analyser', 'aspect', 'augmenter', 'avancer',
        'balance', 'bloc', 'cadre', 'capital', 'cause', 'centre', 'changer', 'client', 'code', 'commun',
        'concept', 'condition', 'créer', 'cycle', 'déployer', 'développer', 'différent', 'digital',
        'domaine', 'donnée', 'erreur', 'étape', 'évaluer', 'événement', 'fichier', 'filtrer', 'format',
        'fonction', 'gestionnaire', 'groupe', 'installer', 'interface', 'langue', 'logique', 'maintenir',
        'méthode', 'modèle', 'module', 'niveau', 'objet', 'option', 'organiser', 'paramètre', 'processus',
        'programme', 'projet', 'protocole', 'requête', 'réseau', 'résultat', 'service', 'source', 'système',
        'type', 'utiliser', 'valeur', 'variable', 'version', 'vérifier', 'vitesse'],
      '20k': ['accélération', 'adaptation', 'administration', 'amplification', 'anticipation', 'approximation',
        'architecture', 'articulation', 'authentification', 'automatisation', 'catégorisation', 'clarification',
        'collaboration', 'communication', 'configuration', 'consolidation', 'coordination', 'décentralisation',
        'décomposition', 'description', 'différentiation', 'documentation', 'élaboration', 'établissement',
        'expérimentation', 'extrapolation', 'facilitation', 'fragmentation', 'généralisation', 'implémentation',
        'infrastructure', 'interprétation', 'investigation', 'justification', 'maintenance', 'maximisation',
        'methodologie', 'minimisation', 'modernisation', 'normalisation', 'optimisation', 'organisation',
        'participation', 'personnalisation', 'priorisation', 'rationalisation', 'réconciliation', 'sécurisation',
        'segmentation', 'spécialisation', 'standardisation', 'synchronisation', 'transformation', 'visualisation']
    },
    de: {
      '1k': ['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'der', 'die', 'das', 'und', 'ist', 'in', 'zu',
        'ein', 'von', 'mit', 'auf', 'für', 'an', 'den', 'dem', 'als', 'bei', 'nach', 'nicht', 'war', 'auch'],
      '5k': ['arbeit', 'benutzer', 'code', 'datei', 'system', 'fehler', 'funktion', 'gruppe', 'inhalt',
        'klasse', 'liste', 'methode', 'modul', 'netzwerk', 'objekt', 'paket', 'prozess', 'schnittstelle',
        'server', 'sprache', 'suche', 'typ', 'version', 'wert', 'zustand', 'abfrage', 'änderung', 'speicher'],
      '20k': ['abstraktion', 'authentifizierung', 'automatisierung', 'beschleunigung', 'dokumentation',
        'implementierung', 'infrastruktur', 'konfiguration', 'kommunikation', 'optimierung',
        'organisation', 'parameterisierung', 'protokollierung', 'segmentierung', 'standardisierung',
        'synchronisierung', 'transformation', 'virtualisierung', 'verschlüsselung', 'verwaltung']
    },
    pt: {
      '1k': ['o', 'a', 'os', 'as', 'de', 'do', 'da', 'dos', 'das', 'um', 'uma', 'e', 'em', 'no', 'na',
        'que', 'se', 'não', 'por', 'com', 'para', 'ele', 'ela', 'ser', 'ter', 'fazer', 'ir', 'bem', 'já'],
      '5k': ['acordo', 'ação', 'atual', 'análise', 'aplicar', 'aspecto', 'base', 'código', 'comum',
        'conceito', 'configurar', 'dados', 'decisão', 'definir', 'digital', 'empresa', 'erro', 'estrutura',
        'evento', 'função', 'global', 'grupo', 'imagem', 'instalar', 'integrar', 'linguagem', 'lógica',
        'memória', 'método', 'modelo', 'módulo', 'nível', 'objeto', 'opção', 'processo', 'programa',
        'projeto', 'protocolo', 'resultado', 'serviço', 'sistema', 'tipo', 'usuário', 'valor', 'variável'],
      '20k': ['abstração', 'adaptação', 'administração', 'amplificação', 'autenticação', 'automatização',
        'categorização', 'colaboração', 'comunicação', 'configuração', 'consolidação', 'coordenação',
        'descentralização', 'documentação', 'implementação', 'infraestrutura', 'interpretação',
        'investigação', 'normalização', 'otimização', 'organização', 'participação', 'personalização',
        'priorização', 'segmentação', 'sincronização', 'transformação', 'visualização']
    }
  };

  // ========== TEXTOS PREDEFINIDOS ==========
  const PRESET_TEXTS = {
    literature: [
      'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.',
      'Llamadme Ismael. Hace algunos años, sin importar cuántos precisamente, teniendo poco dinero en el bolsillo y nada de particular que me interesase en tierra, pensé en zarpar un poco y ver la parte acuática del mundo.',
      'To be, or not to be, that is the question: whether it is nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles.',
      'Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.',
      'La vida es un sueño, y los sueños, sueños son. Temprana muerte no hay vida tan corta que no sea demasiado larga para el que sufre en silencio.',
    ],
    science: [
      'La relatividad especial demuestra que el tiempo y el espacio no son absolutos, sino relativos al observador. A medida que un objeto se acerca a la velocidad de la luz, el tiempo se dilata y el espacio se contrae.',
      'The double helix structure of DNA (discovered by Watson and Crick in 1953) revolutionized our understanding of genetics and hereditary information storage in biological systems.',
      'Quantum mechanics describes the physical properties of matter at subatomic scales. At this level, particles can exist in multiple states simultaneously until they are observed and measured.',
      'La evolución por selección natural, propuesta por Charles Darwin, explica cómo las especies cambian a lo largo del tiempo; los individuos con características más adaptadas tienen mayor probabilidad de sobrevivir.',
      'Las ondas gravitacionales —predichas por Einstein hace un siglo— fueron detectadas por primera vez en 2015. Son perturbaciones en el tejido del espacio-tiempo causadas por eventos cósmicos masivos (p. ej.: fusión de agujeros negros).'
    ],
    philosophy: [
      '\"Cogito, ergo sum\". El único hecho indudable es que yo pienso y, por tanto, existo. Todo lo demás puede ser puesto en duda, pero el acto mismo de dudar prueba la existencia del que duda.',
      'La caverna de Platón nos muestra prisioneros que solo conocen las sombras proyectadas en la pared. Al liberarse, descubren la realidad verdadera; así el filósofo abandona la ignorancia y alcanza el conocimiento.',
      'El imperativo categórico de Kant establece: \"Debemos actuar solo según aquella máxima que puedas querer que se convierta en ley universal\". Es la base de una ética racional y autónoma.',
      '¿La vida examinada vale la pena? La filosofía comienza en la maravilla ante el mundo; esa sensación impulsa la búsqueda de verdad, belleza y justicia en todas sus formas.',
      'Nietzsche proclamó (no literalmente, sino como evento cultural) la muerte de Dios. Sin fundamentos divinos, los humanos deben crear sus propios valores y encontrar significado en la existencia.',
    ],
    tech: [
      'The World Wide Web fue inventado por Tim Berners-Lee en 1989 (en Ginebra, en el CERN). Lo que comenzó como un simple sistema para compartir documentos se convirtió en la base de la vida digital moderna.',
      'Los algoritmos de aprendizaje automático mejoran mediante la experiencia —sin ser programados explícitamente—. Las redes neuronales, inspiradas en el cerebro humano, aprenden a reconocer patrones en enormes conjuntos de datos.',
      'La computación cuántica utiliza qubits que pueden estar en superposición, lo que permite procesar múltiples estados simultáneamente. Esto promete resolver problemas computacionales que son imposibles para ordenadores clásicos: factorización de números grandes, simulación molecular, etc.',
      'El software de código abierto ha transformado la industria. Al hacer el código libremente disponible, desarrolladores en todo el mundo colaboran para construir mejores herramientas, corregir vulnerabilidades e impulsar la innovación.',
      'Los contenedores Docker revolucionaron el despliegue de software al empaquetar aplicaciones con todas sus dependencias. Kubernetes orquestó estos contenedores a escala, habilitando arquitecturas nativas de la nube y prácticas modernas de DevOps.',
    ],
    quotes: [
      '\"La imaginación es más importante que el conocimiento\". El conocimiento es limitado; la imaginación rodea el mundo. — Albert Einstein',
      '\"The only way to do great work is to love what you do\". Si aún no lo has encontrado, sigue buscando; no te conformes. — Steve Jobs',
      '\"En el medio de toda dificultad existe la oportunidad\". El éxito no es final; el fracaso no es fatal: lo que cuenta es el coraje para continuar. — Winston Churchill',
      '\"No hay camino para la paz; la paz es el camino\". No podemos encontrar paz a través de la violencia, solo mediante la comprensión mutua. — Mahatma Gandhi',
      '\"Si piensas que puedes o piensas que no puedes... tienes razón\". El éxito y el fracaso comienzan en la mente, mucho antes de manifestarse en la realidad. — Henry Ford',
    ]
  };

  const PRESET_TEXTS_BY_LANGUAGE = {
    es: {
      literature: [
        '\"En un lugar de la Mancha, de cuyo nombre no quiero acordarme\", no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.',
        'Muchos anos despues, frente al peloton de fusilamiento, Aureliano Buendia habia de recordar aquella tarde remota en que su padre lo llevo a conocer el hielo.'
      ],
      science: [
        'La relatividad especial demuestra que el tiempo y el espacio no son absolutos, sino relativos al observador.',
        'Las ondas gravitacionales son perturbaciones del espacio tiempo causadas por eventos cosmicos masivos.'
      ],
      philosophy: [
        'Pienso, luego existo: la duda misma demuestra la existencia del que duda.',
        'La caverna de Platon sugiere que confundimos sombras con realidad cuando vivimos en la ignorancia.'
      ],
      tech: [
        'El protocolo TCP IP permite dividir la informacion en paquetes para su envio eficiente por la red.',
        'La arquitectura de microservicios divide aplicaciones en servicios pequenos e independientes.'
      ],
      quotes: [
        'La imaginacion es mas importante que el conocimiento. - Albert Einstein',
        'No hay camino para la paz, la paz es el camino. - Mahatma Gandhi'
      ]
    },
    en: {
      literature: [
        'To be, or not to be, that is the question: whether it is nobler in the mind to suffer.',
        'Call me Ishmael. Some years ago, never mind how long precisely, I thought I would sail about a little.'
      ],
      science: [
        'Quantum mechanics describes the behavior of matter and energy at atomic and subatomic scales.',
        'DNA stores hereditary information and enables biological development and function.'
      ],
      philosophy: [
        'The unexamined life is not worth living. Reflection gives direction to human existence.',
        'Without questioning assumptions, people mistake habit for truth.'
      ],
      tech: [
        'The World Wide Web changed how humans publish, discover, and connect information globally.',
        'Open source software enables collaborative innovation at planetary scale.'
      ],
      quotes: [
        'The only way to do great work is to love what you do. - Steve Jobs',
        'In the middle of every difficulty lies opportunity. - Albert Einstein'
      ]
    },
    fr: {
      literature: [
        'Il etait une fois un voyageur qui cherchait la verite dans les livres et dans le silence.',
        'La nuit tombait doucement sur la ville pendant que les fenetres s illuminaient une a une.'
      ],
      science: [
        'La mecanique quantique decrit des phenomenes physiques a l echelle microscopique.',
        'La biologie moderne etudie les systemes vivants a plusieurs niveaux d organisation.'
      ],
      philosophy: [
        'Penser, c est apprendre a distinguer l apparence et la realite.',
        'La liberte exige la responsabilite de choisir et d assumer ses actes.'
      ],
      tech: [
        'Le web a transforme la communication entre individus, entreprises et institutions.',
        'Les logiciels libres favorisent la cooperation et la transparence.'
      ],
      quotes: [
        'La simplicite est la sophistication supreme. - Leonard de Vinci',
        'Le courage n est pas l absence de peur, mais sa maitrise. - inconnu'
      ]
    },
    de: {
      literature: [
        'Die Stadt schlief noch, als der erste Zug den Bahnhof langsam verliess.',
        'Zwischen alten Buchern fand er einen Brief, der sein Leben veranderte.'
      ],
      science: [
        'Die Relativitatstheorie beschreibt den Zusammenhang von Raum, Zeit und Gravitation.',
        'Moderne Physik untersucht die kleinsten Bausteine der Materie.'
      ],
      philosophy: [
        'Freiheit bedeutet, bewusst zu entscheiden und Verantwortung zu ubernehmen.',
        'Erkenntnis beginnt dort, wo Gewohnheit hinterfragt wird.'
      ],
      tech: [
        'Das Internet verbindet Systeme weltweit und ermoglicht schnellen Informationsaustausch.',
        'Offene Standards verbessern Kompatibilitat und Innovation.'
      ],
      quotes: [
        'Phantasie ist wichtiger als Wissen. - Albert Einstein',
        'Wer ein Warum hat, ertragt fast jedes Wie. - Friedrich Nietzsche'
      ]
    },
    pt: {
      literature: [
        'A cidade acordava devagar enquanto o sol pintava as fachadas antigas.',
        'Entre paginas amareladas, ele encontrou uma historia que mudou seu destino.'
      ],
      science: [
        'A genetica moderna explica como a informacao biologica e transmitida entre geracoes.',
        'A fisica quantica estuda fenomenos em escalas extremamente pequenas.'
      ],
      philosophy: [
        'Pensar com clareza exige questionar certezas e aceitar a duvida.',
        'A liberdade so existe quando acompanhada de responsabilidade.'
      ],
      tech: [
        'A internet transformou a forma como trabalhamos, aprendemos e nos comunicamos.',
        'Software livre permite colaboracao aberta e evolucao continua de ferramentas.'
      ],
      quotes: [
        'A persistencia realiza o impossivel. - proverbio',
        'Quem tem um porque enfrenta qualquer como. - Nietzsche'
      ]
    }
  };

  // ========== ESTADO GLOBAL ==========
  const STATE = {
    isTestActive: false,
    testStartTime: null,
    elapsedTime: 0,
    currentCharIndex: 0,
    wordStartIndex: 0,
    correctChars: 0,
    incorrectChars: 0,
    correctedChars: 0,
    wpmHistory: [],
    wpmSnapshotInterval: null,
    testText: '',
    charStates: [],
    prevInputLength: 0,
    currentType: 'words',
    currentDuration: 60,
    currentLanguage: 'es',
    currentDifficulty: '1k',
    currentCategory: 'literature',
    optUppercase: false,
    optPunctuation: false,
    optNumbers: false,
    soundEnabled: true,
    theme: 'serika',
    timerInterval: null,
    currentUser: null,
    lastTabPressAt: 0,
    activityExpanded: true,
    profileMetricMode: 'speed',
    advancedFilters: {
      date: 'all', mode: 'all', time: 'all', words: 'all', difficulty: 'all',
      punctuation: 'all', numbers: 'all', language: 'all', funbox: 'all', tags: 'all'
    },
  };

  const PUNCTUATION = ['.', ',', ';', ':', '!', '?'];
  const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const $ = id => document.getElementById(id);
  const ELEMENTS = {
    navButtons: document.querySelectorAll('.nav-btn'),
    sections: document.querySelectorAll('.section'),
    testInput: $('testInput'),
    textDisplay: $('textDisplay'),
    typingCaret: $('typingCaret'),
    wpmValue: $('wpmValue'),
    accValue: $('accValue'),
    timerValue: $('timerValue'),
    typeWords: $('typeWords'),
    typeTexts: $('typeTexts'),
    testLanguage: $('testLanguage'),
    difficultySelect: $('difficultySelect'),
    diffGroup: $('diffGroup'),
    textCategoryGroup: $('textCategoryGroup'),
    textCategoryChips: document.querySelectorAll('.category-chip'),
    timeSelect: $('timeSelect'),
    timeLabel: $('timeLabel'),
    timeGroup: $('timeGroup'),
    optUppercase: $('optUppercase'),
    optPunctuation: $('optPunctuation'),
    optNumbers: $('optNumbers'),
    wordOptions: $('wordOptions'),
    restartBtn: $('restartBtn'),
    retryBtn: $('retryBtn'),
    results: $('results'),
    // Nuevos elementos de stat blocks Monkeytype
    resultWpmBig: $('resultWpmBig'),
    resultWpmSmall: $('resultWpmSmall'),
    resultAccBig: $('resultAccBig'),
    resultAccSmall: $('resultAccSmall'),
    resultRawWpmBig: $('resultRawWpmBig'),
    resultRawWpmSmall: $('resultRawWpmSmall'),
    resultCharsBreakdown: $('resultCharsBreakdown'),
    resultConsistencyBig: $('resultConsistencyBig'),
    resultConsistencySmall: $('resultConsistencySmall'),
    resultTimeBig: $('resultTimeBig'),
    resultTimeSmall: $('resultTimeSmall'),
    resultTimeExtra: $('resultTimeExtra'),
    resultTestType: $('resultTestType'),
    resultTestLanguage: $('resultTestLanguage'),
    chartModeButtons: document.querySelectorAll('.chart-mode-btn'),
    nextTestBtn: $('nextTestBtn'),
    repeatTestBtn: $('repeatTestBtn'),
    resultsNote: $('resultsNote'),
    // Antiguos elementos (legacy)
    resultWpm: $('resultWpm'),
    resultAcc: $('resultAcc'),
    resultErrors: $('resultErrors'),
    resultCorrect: $('resultCorrect'),
    resultCorrected: $('resultCorrected'),
    resultTime: $('resultTime'),
    wpmChart: $('wpmChart'),
    themeButtons: document.querySelectorAll('.theme-btn'),
    soundToggle: $('soundToggle'),
    clearDataBtn: $('clearDataBtn'),
    bannerClose: document.querySelector('.banner-close'),
    modalOverlay: $('modalOverlay'),
    closeResultsBtn: $('closeResultsBtn'),
    registerPanel: $('registerPanel'),
    loginPanel: $('loginPanel'),
    profilePanel: $('profilePanel'),
    registerForm: $('registerForm'),
    loginForm: $('loginForm'),
    toLoginLink: $('toLoginLink'),
    toRegisterLink: $('toRegisterLink'),
    logoutBtn: $('logoutBtn'),
    profileUsername: $('profileUsername'),
    profileEmail: $('profileEmail'),
    profileDate: $('profileDate'),
    profileDaysAgo: $('profileDaysAgo'),
    profileLevel: $('profileLevel'),
    profileTotalXp: $('profileTotalXp'),
    profileNextPct: $('profileNextPct'),
    profileXpUntil: $('profileXpUntil'),
    statTestsStarted: $('statTestsStarted'),
    statTestsCompleted: $('statTestsCompleted'),
    statRestarts: $('statRestarts'),
    statTotalTime: $('statTotalTime'),
    editProfileBtn: $('editProfileBtn'),
    copyPublicLinkBtn: $('copyPublicLinkBtn'),
    pb15: $('pb15'),
    pb30: $('pb30'),
    pb50w: $('pb50w'),
    pb100w: $('pb100w'),
    pb15Date: $('pb15Date'),
    pb30Date: $('pb30Date'),
    pb50wDate: $('pb50wDate'),
    pb100wDate: $('pb100wDate'),
    showAllPbsBtn: $('showAllPbsBtn'),
    activityRangeSelect: $('activityRangeSelect'),
    activityCountInfo: $('activityCountInfo'),
    activityCountValue: $('activityCountValue'),
    activityLessLink: $('activityLessLink'),
    activityMoreLink: $('activityMoreLink'),
    activityList: $('activityList'),
    profileTrendChart: $('profileTrendChart'),
    filterDate: $('filterDate'),
    filterMode: $('filterMode'),
    filterTime: $('filterTime'),
    filterWords: $('filterWords'),
    filterDifficulty: $('filterDifficulty'),
    filterPunctuation: $('filterPunctuation'),
    filterNumbers: $('filterNumbers'),
    filterLanguage: $('filterLanguage'),
    filterFunbox: $('filterFunbox'),
    filterTags: $('filterTags'),
    speedTrend: $('speedTrend'),
    rangeWords: $('rangeWords'),
    rangeStarted: $('rangeStarted'),
    rangeCompleted: $('rangeCompleted'),
    rangeRestarts: $('rangeRestarts'),
    rangeTime: $('rangeTime'),
    rangeBestWpm: $('rangeBestWpm'),
    rangeAvgWpm: $('rangeAvgWpm'),
    rangeAvgWpm10: $('rangeAvgWpm10'),
    rangeBestRaw: $('rangeBestRaw'),
    rangeAvgRaw: $('rangeAvgRaw'),
    rangeAvgRaw10: $('rangeAvgRaw10'),
    rangeBestAcc: $('rangeBestAcc'),
    rangeAvgAcc: $('rangeAvgAcc'),
    rangeAvgAcc10: $('rangeAvgAcc10'),
    rangeBestCon: $('rangeBestCon'),
    rangeAvgCon: $('rangeAvgCon'),
    rangeAvgCon10: $('rangeAvgCon10'),
    exportCsvBtn: $('exportCsvBtn'),
    loadMoreTestsBtn: $('loadMoreTestsBtn'),
    testsHistory: $('testsHistory'),
    progressChartContainer: $('progressChartContainer'),
    progressChart: $('progressChart'),
    progressTabs: document.querySelectorAll('.progress-tab'),
  };

  function init() {
    loadSettings();
    setupEventListeners();
    setCategoryChipActive(STATE.currentCategory);
    updateTimerUiForMode();
    generateTestText();
    renderTextDisplay();
    updateCaretPosition();
  }

  function loadSettings() {
    const savedTheme = localStorage.getItem('theme') || 'serika';
    const savedSound = localStorage.getItem('soundEnabled');
    STATE.theme = savedTheme;
    STATE.soundEnabled = savedSound !== 'false';
    applyTheme(savedTheme);
    updateThemeButtons();
    ELEMENTS.soundToggle.checked = STATE.soundEnabled;
    loadCurrentUser();
  }

  function loadCurrentUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      STATE.currentUser = JSON.parse(savedUser);
      updateAuthUI();
    }
  }

  function registerUser(username, email, password) {
    if (!username || !email || !password) {
      alert('Todos los campos son requeridos');
      return false;
    }
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email]) {
      alert('Este email ya está registrado');
      return false;
    }
    const newUser = {
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
      testsStarted: 0,
      restarts: 0,
      tests: []
    };
    users[email] = newUser;
    localStorage.setItem('users', JSON.stringify(users));
    loginUserByEmail(email, password);
    return true;
  }

  function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[email];
    if (!user || user.password !== password) {
      alert('Email o contraseña incorrectos');
      return false;
    }
    STATE.currentUser = {
      email: user.email,
      username: user.username,
      createdAt: user.createdAt
    };
    localStorage.setItem('currentUser', JSON.stringify(STATE.currentUser));
    updateAuthUI();
    return true;
  }

  function loginUserByEmail(email, password) {
    loginUser(email, password);
  }

  function logoutUser() {
    STATE.currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
  }

  function updateAuthUI() {
    const isLoggedIn = STATE.currentUser !== null;
    ELEMENTS.registerPanel.style.display = isLoggedIn ? 'none' : 'block';
    ELEMENTS.loginPanel.style.display = isLoggedIn ? 'none' : 'block';
    ELEMENTS.profilePanel.style.display = isLoggedIn ? 'block' : 'none';
    
    if (isLoggedIn) {
      displayProfile();
    }
  }

  function displayProfile() {
    if (!STATE.currentUser) return;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userData = users[STATE.currentUser.email];
    if (!userData) return;

    const tests = userData.tests || [];
    const stats = calculateStats(tests, userData);

    const joined = new Date(userData.createdAt);
    const daysAgo = Math.max(0, Math.floor((Date.now() - joined.getTime()) / (1000 * 60 * 60 * 24)));

    ELEMENTS.profileUsername.textContent = userData.username;
    ELEMENTS.profileEmail.textContent = userData.email;
    ELEMENTS.profileDate.textContent = 'Joined ' + joined.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    if (ELEMENTS.profileDaysAgo) ELEMENTS.profileDaysAgo.textContent = daysAgo + ' days ago';

    if (ELEMENTS.profileLevel) ELEMENTS.profileLevel.textContent = String(stats.level);
    if (ELEMENTS.profileTotalXp) ELEMENTS.profileTotalXp.textContent = stats.totalXp.toLocaleString() + ' total xp';
    if (ELEMENTS.profileNextPct) ELEMENTS.profileNextPct.textContent = stats.nextLevelPct.toFixed(2) + '%';
    if (ELEMENTS.profileXpUntil) {
      ELEMENTS.profileXpUntil.textContent = stats.level + ' / 1000 ' + stats.xpUntilNext.toLocaleString() + ' xp until next level';
    }

    if (ELEMENTS.statTestsStarted) ELEMENTS.statTestsStarted.textContent = stats.testsStarted.toLocaleString();
    if (ELEMENTS.statTestsCompleted) {
      ELEMENTS.statTestsCompleted.textContent = stats.totalTests.toLocaleString() + ' (' + stats.completedPct.toFixed(0) + '%)';
    }
    if (ELEMENTS.statRestarts) ELEMENTS.statRestarts.textContent = stats.restartsPerCompleted.toFixed(1) + ' restarts per completed test';
    if (ELEMENTS.statTotalTime) ELEMENTS.statTotalTime.textContent = formatHms(stats.totalTime);

    renderPersonalBests(tests);

    const range = ELEMENTS.activityRangeSelect ? ELEMENTS.activityRangeSelect.value : '12months';
    const testsInRange = applyAdvancedFilters(getTestsInRange(tests, range));
    renderActivityByDay(testsInRange, range);
    renderRangeSummary(testsInRange, stats);
    drawProfileTrendChart(testsInRange, STATE.profileMetricMode);
    displayTestsHistory(testsInRange);
  }

  function calculateStats(tests, userData) {
    if (!tests || tests.length === 0) {
      return {
        totalTests: 0,
        totalTime: 0,
        testsStarted: userData && typeof userData.testsStarted === 'number' ? userData.testsStarted : 0,
        completedPct: 0,
        restartsPerCompleted: 0,
        totalXp: 0,
        level: 1,
        xpUntilNext: 500,
        nextLevelPct: 0
      };
    }

    let totalTime = 0;
    let totalXp = 0;

    tests.forEach(test => {
      totalTime += Number(test.time || 0);
      totalXp += Math.max(10, Math.round((Number(test.wpm || 0) * 2) + Number(test.acc || 0)));
    });

    const testsStarted = userData && typeof userData.testsStarted === 'number'
      ? Math.max(userData.testsStarted, tests.length)
      : tests.length;
    const restarts = userData && typeof userData.restarts === 'number' ? userData.restarts : 0;
    const completedPct = testsStarted > 0 ? (tests.length / testsStarted) * 100 : 0;
    const level = Math.floor(totalXp / 500) + 1;
    const xpInLevel = totalXp % 500;

    return {
      totalTests: tests.length,
      totalTime: totalTime,
      testsStarted: testsStarted,
      completedPct: completedPct,
      restartsPerCompleted: tests.length > 0 ? restarts / tests.length : 0,
      totalXp: totalXp,
      level: level,
      xpUntilNext: 500 - xpInLevel,
      nextLevelPct: (xpInLevel / 500) * 100
    };
  }

  function displayTestsHistory(tests) {
    if (!tests || tests.length === 0) {
      ELEMENTS.testsHistory.innerHTML = '<p style="color: var(--text-light); text-align: center;">Sin tests registrados aún.</p>';
      return;
    }

    let html = '<div class="test-entry test-entry-header">' +
      '<div>wpm</div><div>raw</div><div>accuracy</div><div>consistency</div><div>mode</div><div>info</div><div>tags</div><div>date</div>' +
      '</div>';

    tests.slice().reverse().forEach(test => {
      const raw = Number(test.rawWpm || test.wpm || 0);
      const consistency = Number(test.consistency || 0);
      const modeLabel = test.type === 'words' ? 'words ' + (test.wordCount || 50) : 'time ' + (test.duration || STATE.currentDuration);
      const info = 'lang ' + (test.language || STATE.currentLanguage) + ' diff ' + (test.difficulty || STATE.currentDifficulty);
      const tags = test.tags && test.tags.length ? test.tags.join(', ') : 'no tags';
      const date = new Date(test.date).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      html += '<div class="test-entry">' +
        '<div><div class="test-entry-value">' + Number(test.wpm || 0).toFixed(2) + '</div></div>' +
        '<div><div class="test-entry-value">' + raw.toFixed(2) + '</div></div>' +
        '<div><div class="test-entry-value">' + Number(test.acc || 0).toFixed(2) + '%</div></div>' +
        '<div><div class="test-entry-value">' + consistency.toFixed(2) + '%</div></div>' +
        '<div><div class="test-entry-value">' + modeLabel + '</div></div>' +
        '<div><div class="test-entry-value">' + info + '</div></div>' +
        '<div><div class="test-entry-value">' + tags + '</div></div>' +
        '<div><div class="test-entry-value">' + date + '</div></div>' +
        '</div>';
    });

    ELEMENTS.testsHistory.innerHTML = html;
  }

  function formatHms(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const hh = String(Math.floor(s / 3600)).padStart(2, '0');
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return hh + ':' + mm + ':' + ss;
  }

  function getTestsInRange(tests, range) {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    let ms = 365 * day;
    if (range === 'day') ms = day;
    if (range === 'week') ms = 7 * day;
    if (range === 'month') ms = 30 * day;
    if (range === '3months') ms = 90 * day;
    if (range === 'all') ms = Number.MAX_SAFE_INTEGER;
    return tests.filter(test => (now - new Date(test.date).getTime()) <= ms);
  }

  function renderActivityByDay(tests, range) {
    if (!ELEMENTS.activityList) return;
    const now = new Date();
    const days = range === 'day' ? 1 : range === 'week' ? 7 : range === 'month' ? 30 : range === '3months' ? 90 : range === '12months' ? 365 : 365;
    const map = {};
    tests.forEach(test => {
      const d = new Date(test.date);
      const key = d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
      map[key] = (map[key] || 0) + 1;
    });

    const rows = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - (i * 86400000));
      const key = d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
      const pretty = formatActivityDateUTC(d);
      const count = map[key] || 0;
      rows.push('<div class="activity-item">' + (count ? (count + ' tests on ' + pretty) : ('no activity on ' + pretty)) + '</div>');
    }

    if (ELEMENTS.activityCountValue) ELEMENTS.activityCountValue.textContent = String(tests.length);
    ELEMENTS.activityList.innerHTML = rows.join('');
    ELEMENTS.activityList.style.display = STATE.activityExpanded ? 'grid' : 'none';
  }

  function renderPersonalBests(tests) {
    const empty = '- -';
    const getBest = arr => arr.length ? arr.reduce((a, b) => (Number(a.wpm || 0) > Number(b.wpm || 0) ? a : b)) : null;
    const by15 = getBest(tests.filter(t => Number(t.duration || 0) === 15));
    const by30 = getBest(tests.filter(t => Number(t.duration || 0) === 30));
    const by50 = getBest(tests.filter(t => t.type === 'words' && Number(t.wordCount || 50) === 50));
    const by100 = getBest(tests.filter(t => t.type === 'words' && Number(t.wordCount || 50) === 100));

    const fmtPb = t => t
      ? Number(t.wpm || 0) + ' wpm | ' + Number(t.rawWpm || t.wpm || 0) + ' raw | ' + Number(t.acc || 0).toFixed(0) + '% acc | ' + Number(t.consistency || 0).toFixed(0) + '% con'
      : empty;
    const fmtDate = t => t ? new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';

    if (ELEMENTS.pb15) ELEMENTS.pb15.textContent = fmtPb(by15);
    if (ELEMENTS.pb30) ELEMENTS.pb30.textContent = fmtPb(by30);
    if (ELEMENTS.pb50w) ELEMENTS.pb50w.textContent = fmtPb(by50);
    if (ELEMENTS.pb100w) ELEMENTS.pb100w.textContent = fmtPb(by100);
    if (ELEMENTS.pb15Date) ELEMENTS.pb15Date.textContent = fmtDate(by15);
    if (ELEMENTS.pb30Date) ELEMENTS.pb30Date.textContent = fmtDate(by30);
    if (ELEMENTS.pb50wDate) ELEMENTS.pb50wDate.textContent = fmtDate(by50);
    if (ELEMENTS.pb100wDate) ELEMENTS.pb100wDate.textContent = fmtDate(by100);
  }

  function renderRangeSummary(tests, globalStats) {
    const count = tests.length;
    const totalWords = tests.reduce((sum, t) => sum + Math.round(Number(t.chars || 0) / 5), 0);
    const totalTime = tests.reduce((sum, t) => sum + Number(t.time || 0), 0);
    const avg = (arr, field) => arr.length ? arr.reduce((s, t) => s + Number(t[field] || 0), 0) / arr.length : 0;
    const max = (arr, field) => arr.length ? Math.max(...arr.map(t => Number(t[field] || 0))) : 0;
    const last10 = tests.slice(-10);

    const avgWpm = avg(tests, 'wpm');
    const avgWpm10 = avg(last10, 'wpm');
    const avgRaw = tests.length ? tests.reduce((s, t) => s + Number(t.rawWpm || t.wpm || 0), 0) / tests.length : 0;
    const avgRaw10 = last10.length ? last10.reduce((s, t) => s + Number(t.rawWpm || t.wpm || 0), 0) / last10.length : 0;
    const avgAcc = avg(tests, 'acc');
    const avgAcc10 = avg(last10, 'acc');
    const avgCon = avg(tests, 'consistency');
    const avgCon10 = avg(last10, 'consistency');

    if (ELEMENTS.rangeWords) ELEMENTS.rangeWords.textContent = totalWords.toLocaleString();
    if (ELEMENTS.rangeStarted) ELEMENTS.rangeStarted.textContent = globalStats.testsStarted.toLocaleString();
    if (ELEMENTS.rangeCompleted) {
      const pct = globalStats.testsStarted > 0 ? (count / globalStats.testsStarted) * 100 : 0;
      ELEMENTS.rangeCompleted.textContent = count.toLocaleString() + ' (' + pct.toFixed(0) + '%)';
    }
    if (ELEMENTS.rangeRestarts) ELEMENTS.rangeRestarts.textContent = globalStats.restartsPerCompleted.toFixed(1) + ' restarts per completed test';
    if (ELEMENTS.rangeTime) ELEMENTS.rangeTime.textContent = formatHms(totalTime);
    if (ELEMENTS.rangeBestWpm) ELEMENTS.rangeBestWpm.textContent = max(tests, 'wpm').toFixed(0) + ' time ' + STATE.currentDuration;
    if (ELEMENTS.rangeAvgWpm) ELEMENTS.rangeAvgWpm.textContent = avgWpm.toFixed(0);
    if (ELEMENTS.rangeAvgWpm10) ELEMENTS.rangeAvgWpm10.textContent = 'last 10: ' + avgWpm10.toFixed(0);
    if (ELEMENTS.rangeBestRaw) ELEMENTS.rangeBestRaw.textContent = max(tests.map(t => ({ rawWpm: Number(t.rawWpm || t.wpm || 0) })), 'rawWpm').toFixed(0);
    if (ELEMENTS.rangeAvgRaw) ELEMENTS.rangeAvgRaw.textContent = avgRaw.toFixed(0);
    if (ELEMENTS.rangeAvgRaw10) ELEMENTS.rangeAvgRaw10.textContent = 'last 10: ' + avgRaw10.toFixed(0);
    if (ELEMENTS.rangeBestAcc) ELEMENTS.rangeBestAcc.textContent = max(tests, 'acc').toFixed(0) + '%';
    if (ELEMENTS.rangeAvgAcc) ELEMENTS.rangeAvgAcc.textContent = avgAcc.toFixed(0) + '%';
    if (ELEMENTS.rangeAvgAcc10) ELEMENTS.rangeAvgAcc10.textContent = 'last 10: ' + avgAcc10.toFixed(0) + '%';
    if (ELEMENTS.rangeBestCon) ELEMENTS.rangeBestCon.textContent = max(tests, 'consistency').toFixed(0) + '%';
    if (ELEMENTS.rangeAvgCon) ELEMENTS.rangeAvgCon.textContent = avgCon.toFixed(0) + '%';
    if (ELEMENTS.rangeAvgCon10) ELEMENTS.rangeAvgCon10.textContent = 'last 10: ' + avgCon10.toFixed(0) + '%';

    if (ELEMENTS.speedTrend) {
      const hours = totalTime / 3600;
      const trend = hours > 0 ? (avgWpm10 - avgWpm) / hours : 0;
      const sign = trend > 0 ? '+' : '';
      ELEMENTS.speedTrend.textContent = 'Speed change per hour spent typing: ' + sign + trend.toFixed(2) + ' wpm';
    }
  }

  function applyAdvancedFilters(tests) {
    const f = STATE.advancedFilters;
    return tests.filter(t => {
      const mode = t.type === 'texts' ? 'time' : (t.type || 'words');
      if (f.mode !== 'all' && f.mode !== mode && f.mode !== t.type) return false;
      if (f.time !== 'all' && String(t.duration || STATE.currentDuration) !== f.time) return false;
      if (f.words !== 'all' && String(t.wordCount || 50) !== f.words) return false;
      if (f.difficulty !== 'all' && String(t.difficulty || '1k') !== f.difficulty) return false;
      if (f.punctuation !== 'all' && String(t.punctuation || 'off') !== f.punctuation) return false;
      if (f.numbers !== 'all' && String(t.numbers || 'off') !== f.numbers) return false;
      if (f.language !== 'all' && String(t.language || 'es') !== f.language) return false;
      if (f.tags !== 'all') {
        const tags = t.tags || [];
        if (!tags.includes(f.tags)) return false;
      }
      return true;
    });
  }

  function formatActivityDateUTC(dateObj) {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = week[dateObj.getUTCDay()];
    const dd = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = mon[dateObj.getUTCMonth()];
    const yyyy = dateObj.getUTCFullYear();
    return dayName + ' ' + dd + ' ' + month + ' ' + yyyy;
  }

  function applyFilterPreset(preset) {
    if (!ELEMENTS.activityRangeSelect) return;
    if (preset === 'last day') ELEMENTS.activityRangeSelect.value = 'day';
    else if (preset === 'last week') ELEMENTS.activityRangeSelect.value = 'week';
    else if (preset === 'last month') ELEMENTS.activityRangeSelect.value = 'month';
    else if (preset === 'last 3 months') ELEMENTS.activityRangeSelect.value = '3months';
    else if (preset === 'all time') ELEMENTS.activityRangeSelect.value = 'all';
  }

  function drawProfileTrendChart(tests, metricMode) {
    if (!ELEMENTS.profileTrendChart) return;
    const canvas = ELEMENTS.profileTrendChart;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth || 860;
    canvas.height = 220;

    const style = getComputedStyle(document.body);
    const accent = style.getPropertyValue('--accent-primary').trim() || '#e2b714';
    const textLight = style.getPropertyValue('--text-light').trim() || '#a8aab5';
    const bgSec = style.getPropertyValue('--bg-secondary').trim() || '#2c2e31';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgSec;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!tests || tests.length < 2) {
      ctx.fillStyle = textLight;
      ctx.font = '12px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('No data for selected filters', canvas.width / 2, canvas.height / 2);
      return;
    }

    const sorted = tests.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    let values = sorted.map(t => Number(t.wpm || 0));
    if (metricMode === 'accuracy') values = sorted.map(t => Number(t.acc || 0));
    if (metricMode === 'avg10') {
      values = sorted.map((_, i) => {
        const base = sorted.slice(Math.max(0, i - 9), i + 1);
        return base.reduce((s, t) => s + Number(t.wpm || 0), 0) / base.length;
      });
    }
    if (metricMode === 'avg100') {
      values = sorted.map((_, i) => {
        const base = sorted.slice(Math.max(0, i - 99), i + 1);
        return base.reduce((s, t) => s + Number(t.wpm || 0), 0) / base.length;
      });
    }

    const pad = { left: 34, right: 10, top: 12, bottom: 20 };
    const w = canvas.width - pad.left - pad.right;
    const h = canvas.height - pad.top - pad.bottom;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(1, max - min);

    ctx.beginPath();
    values.forEach((v, i) => {
      const x = pad.left + (i / Math.max(1, values.length - 1)) * w;
      const y = pad.top + h - ((v - min) / range) * h;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function saveTestResult(testData) {
    if (!STATE.currentUser) return;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[STATE.currentUser.email];
    if (!user) return;

    user.tests.push({
      wpm: testData.wpm,
      rawWpm: testData.rawWpm,
      acc: testData.acc,
      consistency: testData.consistency,
      chars: testData.chars,
      time: testData.time,
      type: testData.type,
      duration: testData.duration,
      wordCount: testData.wordCount,
      language: testData.language,
      difficulty: testData.difficulty,
      punctuation: testData.punctuation,
      numbers: testData.numbers,
      tags: testData.tags || [],
      date: new Date().toISOString()
    });

    users[STATE.currentUser.email] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }

  function bumpUserCounter(field, amount) {
    if (!STATE.currentUser) return;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[STATE.currentUser.email];
    if (!user) return;
    user[field] = Math.max(0, Number(user[field] || 0) + amount);
    users[STATE.currentUser.email] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }

  function generateTestText() {
    if (STATE.currentType === 'texts') {
      generatePresetText();
    } else {
      generateWordText();
    }
    STATE.charStates = new Array(STATE.testText.length).fill('empty');
  }

  function generateWordText() {
    const langBank = WORD_BANKS[STATE.currentLanguage] || WORD_BANKS.es;
    const bank = langBank[STATE.currentDifficulty] || langBank['1k'];
    const targetLen = 240;
    const words = [];
    let len = 0;

    while (len < targetLen) {
      let word = bank[Math.floor(Math.random() * bank.length)];

      if (STATE.optUppercase && Math.random() < 0.15) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }

      if (STATE.optNumbers && Math.random() < 0.12) {
        words.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
        len += 2;
      }

      words.push(word);
      len += word.length + 1;

      if (STATE.optPunctuation && words.length > 1 && Math.random() < 0.15) {
        const p = PUNCTUATION[Math.floor(Math.random() * PUNCTUATION.length)];
        words[words.length - 1] += p;
      }
    }

    STATE.testText = words.join(' ').trim();
  }

  function generatePresetText() {
    const languagePool = PRESET_TEXTS_BY_LANGUAGE[STATE.currentLanguage] || PRESET_TEXTS_BY_LANGUAGE.es;
    const pool = languagePool[STATE.currentCategory]
      || PRESET_TEXTS[STATE.currentCategory]
      || PRESET_TEXTS.literature;
    STATE.testText = pool[Math.floor(Math.random() * pool.length)];
  }

  function renderTextDisplay() {
    let html = '';
    for (let i = 0; i < STATE.testText.length; i++) {
      const char = STATE.testText[i];
      const stateClass = STATE.charStates[i] === 'correct'
        ? 'correct'
        : STATE.charStates[i] === 'incorrect'
          ? 'incorrect'
          : '';
      const currentClass = i === STATE.currentCharIndex ? ' current' : '';
      html += '<span data-i="' + i + '" class="' + stateClass + currentClass + '">' + escapeHtml(char) + '</span>';
    }
    ELEMENTS.textDisplay.innerHTML = html;
    updateCaretPosition();
  }

  function updateCaretPosition() {
    const caret = ELEMENTS.typingCaret;
    if (!caret) return;

    if (STATE.currentCharIndex >= STATE.testText.length) {
      caret.style.opacity = '0';
      return;
    }

    const currentEl = ELEMENTS.textDisplay.querySelector('[data-i="' + STATE.currentCharIndex + '"]');
    if (!currentEl) return;

    // Obtener rectángulos en coordenadas de pantalla
    const testAreaRect = ELEMENTS.textDisplay.parentElement.getBoundingClientRect();
    const charRect = currentEl.getBoundingClientRect();

    // Calcular posición relativa al contenedor del caret (.test-area)
    const x = charRect.left - testAreaRect.left;
    const y = charRect.top - testAreaRect.top + (charRect.height * 0.08);
    const h = Math.max(12, charRect.height * 0.84);

    caret.style.opacity = '1';
    caret.style.left = x + 'px';
    caret.style.top = y + 'px';
    caret.style.height = h + 'px';

    // Scroll suave para mantener visible la letra actual
    currentEl.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }

  function setCategoryChipActive(category) {
    ELEMENTS.textCategoryChips.forEach(chip => {
      const isActive = chip.dataset.category === category;
      chip.classList.toggle('active', isActive);
      chip.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });
  }

  function updateTimerUiForMode() {
    const isTextMode = STATE.currentType === 'texts';
    ELEMENTS.timeGroup.style.display = isTextMode ? 'none' : 'flex';
    ELEMENTS.timeLabel.textContent = isTextMode ? 'Cronómetro:' : 'Duración:';
    ELEMENTS.timerValue.textContent = isTextMode ? '0s' : (STATE.currentDuration + 's');
  }

  function startActiveTimer() {
    clearInterval(STATE.timerInterval);

    if (STATE.currentType === 'texts') {
      STATE.timerInterval = setInterval(() => {
        STATE.elapsedTime = Date.now() - STATE.testStartTime;
        ELEMENTS.timerValue.textContent = Math.floor(STATE.elapsedTime / 1000) + 's';
      }, 100);
      return;
    }

    const durationMs = STATE.currentDuration * 1000;
    STATE.timerInterval = setInterval(() => {
      STATE.elapsedTime = Date.now() - STATE.testStartTime;
      const remaining = Math.max(0, Math.ceil((durationMs - STATE.elapsedTime) / 1000));
      ELEMENTS.timerValue.textContent = remaining + 's';
      if (remaining === 0) {
        clearInterval(STATE.timerInterval);
        endTest();
      }
    }, 100);
  }

  function setupEventListeners() {
    ELEMENTS.navButtons.forEach(btn => btn.addEventListener('click', handleNavigation));

    ELEMENTS.typeWords.addEventListener('click', () => switchContentType('words'));
    ELEMENTS.typeTexts.addEventListener('click', () => switchContentType('texts'));

    ELEMENTS.testLanguage.addEventListener('change', e => {
      STATE.currentLanguage = e.target.value;
      rebuildTest();
    });
    ELEMENTS.difficultySelect.addEventListener('change', e => {
      STATE.currentDifficulty = e.target.value;
      rebuildTest();
    });
    ELEMENTS.textCategoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const category = chip.dataset.category;
        if (!category || category === STATE.currentCategory) return;
        STATE.currentCategory = category;
        setCategoryChipActive(category);
        rebuildTest();
      });
    });
    ELEMENTS.timeSelect.addEventListener('change', e => {
      STATE.currentDuration = parseInt(e.target.value, 10);
      updateTimerUiForMode();
      rebuildTest();
    });

    ELEMENTS.optUppercase.addEventListener('change', e => {
      STATE.optUppercase = e.target.checked;
      rebuildTest();
    });
    ELEMENTS.optPunctuation.addEventListener('change', e => {
      STATE.optPunctuation = e.target.checked;
      rebuildTest();
    });
    ELEMENTS.optNumbers.addEventListener('change', e => {
      STATE.optNumbers = e.target.checked;
      rebuildTest();
    });

    ELEMENTS.testInput.addEventListener('keydown', handleKeyDown);
    ELEMENTS.testInput.addEventListener('input', handleTestInput);
    ELEMENTS.textDisplay.addEventListener('click', () => ELEMENTS.testInput.focus());

    ELEMENTS.restartBtn.addEventListener('click', rebuildTest);
    ELEMENTS.retryBtn.addEventListener('click', closeResults);

    ELEMENTS.themeButtons.forEach(btn => btn.addEventListener('click', handleThemeChange));
    ELEMENTS.soundToggle.addEventListener('change', () => {
      STATE.soundEnabled = ELEMENTS.soundToggle.checked;
      localStorage.setItem('soundEnabled', STATE.soundEnabled);
    });
    ELEMENTS.clearDataBtn.addEventListener('click', () => {
      if (confirm('¿Limpiar todos los datos locales?')) {
        localStorage.clear();
        location.reload();
      }
    });
    ELEMENTS.bannerClose.addEventListener('click', () => {
      document.querySelector('.banner').style.display = 'none';
    });

    ELEMENTS.closeResultsBtn.addEventListener('click', closeResults);
    ELEMENTS.modalOverlay.addEventListener('click', closeResults);

    ELEMENTS.registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = $('regUsername').value.trim();
      const email = $('regEmail').value.trim();
      const password = $('regPassword').value;
      const confirmPassword = $('regPasswordConfirm').value;
      
      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      
      if (registerUser(username, email, password)) {
        $('regUsername').value = '';
        $('regEmail').value = '';
        $('regPassword').value = '';
        $('regPasswordConfirm').value = '';
      }
    });

    ELEMENTS.loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = $('loginEmail').value.trim();
      const password = $('loginPassword').value;
      
      if (loginUser(email, password)) {
        $('loginEmail').value = '';
        $('loginPassword').value = '';
      }
    });

    ELEMENTS.toLoginLink.addEventListener('click', e => {
      e.preventDefault();
      ELEMENTS.registerPanel.style.display = 'none';
      ELEMENTS.loginPanel.style.display = 'block';
    });

    ELEMENTS.toRegisterLink.addEventListener('click', e => {
      e.preventDefault();
      ELEMENTS.loginPanel.style.display = 'none';
      ELEMENTS.registerPanel.style.display = 'block';
    });

    ELEMENTS.logoutBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        logoutUser();
      }
    });

    ELEMENTS.progressTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        ELEMENTS.progressTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        drawProgressChart(tab.dataset.period);
      });
    });

    if (ELEMENTS.activityRangeSelect) {
      ELEMENTS.activityRangeSelect.addEventListener('change', () => {
        displayProfile();
      });
    }

    if (ELEMENTS.activityLessLink) {
      ELEMENTS.activityLessLink.addEventListener('click', e => {
        e.preventDefault();
        STATE.activityExpanded = false;
        if (ELEMENTS.activityList) ELEMENTS.activityList.style.display = 'none';
      });
    }

    if (ELEMENTS.activityMoreLink) {
      ELEMENTS.activityMoreLink.addEventListener('click', e => {
        e.preventDefault();
        STATE.activityExpanded = true;
        if (ELEMENTS.activityList) ELEMENTS.activityList.style.display = 'grid';
      });
    }

    if (ELEMENTS.copyPublicLinkBtn) {
      ELEMENTS.copyPublicLinkBtn.addEventListener('click', async () => {
        const slug = STATE.currentUser ? STATE.currentUser.username : 'user';
        const link = location.origin + location.pathname + '#profile-' + slug;
        try {
          await navigator.clipboard.writeText(link);
          alert('Enlace copiado: ' + link);
        } catch (_) {
          alert('No se pudo copiar el enlace.');
        }
      });
    }

    if (ELEMENTS.editProfileBtn) {
      ELEMENTS.editProfileBtn.addEventListener('click', () => {
        alert('Editor de perfil disponible en una próxima versión.');
      });
    }

    if (ELEMENTS.exportCsvBtn) {
      ELEMENTS.exportCsvBtn.addEventListener('click', () => {
        exportTestsCsv();
      });
    }

    if (ELEMENTS.loadMoreTestsBtn) {
      ELEMENTS.loadMoreTestsBtn.addEventListener('click', () => {
        alert('Mostrando el histórico disponible (límite actual localStorage).');
      });
    }

    document.querySelectorAll('.metric-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.metric-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.profileMetricMode = btn.dataset.metric || 'speed';
        displayProfile();
      });
    });

    document.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilterPreset(btn.textContent.trim().toLowerCase());
        displayProfile();
      });
    });

    [
      ELEMENTS.filterDate, ELEMENTS.filterMode, ELEMENTS.filterTime, ELEMENTS.filterWords,
      ELEMENTS.filterDifficulty, ELEMENTS.filterPunctuation, ELEMENTS.filterNumbers,
      ELEMENTS.filterLanguage, ELEMENTS.filterFunbox, ELEMENTS.filterTags
    ].forEach(sel => {
      if (!sel) return;
      sel.addEventListener('change', () => {
        STATE.advancedFilters.date = ELEMENTS.filterDate ? ELEMENTS.filterDate.value : 'all';
        STATE.advancedFilters.mode = ELEMENTS.filterMode ? ELEMENTS.filterMode.value : 'all';
        STATE.advancedFilters.time = ELEMENTS.filterTime ? ELEMENTS.filterTime.value : 'all';
        STATE.advancedFilters.words = ELEMENTS.filterWords ? ELEMENTS.filterWords.value : 'all';
        STATE.advancedFilters.difficulty = ELEMENTS.filterDifficulty ? ELEMENTS.filterDifficulty.value : 'all';
        STATE.advancedFilters.punctuation = ELEMENTS.filterPunctuation ? ELEMENTS.filterPunctuation.value : 'all';
        STATE.advancedFilters.numbers = ELEMENTS.filterNumbers ? ELEMENTS.filterNumbers.value : 'all';
        STATE.advancedFilters.language = ELEMENTS.filterLanguage ? ELEMENTS.filterLanguage.value : 'all';
        STATE.advancedFilters.funbox = ELEMENTS.filterFunbox ? ELEMENTS.filterFunbox.value : 'all';
        STATE.advancedFilters.tags = ELEMENTS.filterTags ? ELEMENTS.filterTags.value : 'all';
        displayProfile();
      });
    });

    // Event listeners para modal de Términos de Servicio
    const termsLink = document.getElementById('termsLink');
    const termsModal = $('termsModal');
    const termsModalOverlay = $('termsModalOverlay');
    const closeTermsBtn = $('closeTermsBtn');
    
    if (termsLink) {
      termsLink.addEventListener('click', e => {
        e.preventDefault();
        termsModal.style.display = 'block';
        termsModalOverlay.style.display = 'block';
      });
    }
    
    if (closeTermsBtn) {
      closeTermsBtn.addEventListener('click', () => {
        termsModal.style.display = 'none';
        termsModalOverlay.style.display = 'none';
      });
    }
    
    if (termsModalOverlay) {
      termsModalOverlay.addEventListener('click', () => {
        termsModal.style.display = 'none';
        termsModalOverlay.style.display = 'none';
      });
    }

    // Event listeners para los botones de modo de gráfico (escala/raw/errores)
    ELEMENTS.chartModeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        ELEMENTS.chartModeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        // TODO: Filtrar y redibujar gráfico según mode (scale/raw/errors)
        drawWpmChart([...STATE.wpmHistory]);
      });
    });

    // Event listeners para botones de acciones de resultados
    if (ELEMENTS.nextTestBtn) {
      ELEMENTS.nextTestBtn.addEventListener('click', () => {
        closeResults();
        rebuildTest();
      });
    }

    if (ELEMENTS.repeatTestBtn) {
      ELEMENTS.repeatTestBtn.addEventListener('click', () => {
        closeResults();
        resetTest();
        ELEMENTS.testInput.focus();
      });
    }

    window.addEventListener('resize', () => {
      updateCaretPosition();
    });

    document.addEventListener('keydown', handleGlobalShortcuts);
  }

  function switchContentType(type) {
    STATE.currentType = type;
    ELEMENTS.typeWords.classList.toggle('active', type === 'words');
    ELEMENTS.typeTexts.classList.toggle('active', type === 'texts');
    ELEMENTS.diffGroup.style.display = type === 'words' ? 'flex' : 'none';
    ELEMENTS.textCategoryGroup.style.display = type === 'texts' ? 'flex' : 'none';
    ELEMENTS.wordOptions.style.display = type === 'words' ? 'flex' : 'none';
    updateTimerUiForMode();
    rebuildTest();
  }

  function rebuildTest() {
    if (STATE.isTestActive) {
      bumpUserCounter('restarts', 1);
    }
    generateTestText();
    resetTest();
  }

  function handleKeyDown(e) {
    if (!STATE.isTestActive && e.key.length === 1) {
      startTest();
    }

    if (e.key === ' ') {
      e.preventDefault();
      if (!STATE.isTestActive) return;
      commitCurrentWordAndAdvance();
      return;
    }
  }

  function handleTestInput() {
    if (!STATE.isTestActive) return;

    const input = ELEMENTS.testInput.value;
    const newLen = input.length;

    if (newLen > STATE.testText.length) {
      ELEMENTS.testInput.value = input.slice(0, STATE.testText.length);
      return;
    }

    if (newLen > STATE.prevInputLength) {
      const pos = newLen - 1;
      const typed = input[pos];
      const expected = STATE.testText[pos];
      setCharStateFromTyping(pos, typed, expected);
      STATE.currentCharIndex = newLen;
    } else if (newLen < STATE.prevInputLength) {
      const removedPos = STATE.prevInputLength - 1;
      rollbackCharState(removedPos);
      STATE.currentCharIndex = newLen;
      STATE.wordStartIndex = Math.min(STATE.wordStartIndex, newLen);
    }

    STATE.prevInputLength = newLen;
    updateLiveMetrics();
    renderTextDisplay();

    if (newLen >= STATE.testText.length) {
      if (STATE.currentType === 'words') {
        // En modo palabras, generar más palabras en lugar de terminar
        extendTestText();
      } else {
        // En modo textos, terminar cuando se completa el texto
        endTest();
      }
    }
  }

  function extendTestText() {
    // Guardar texto actual y sus estados
    const currentText = STATE.testText;
    const currentStates = [...STATE.charStates];

    // Generar nuevas palabras
    generateWordText();
    const newWords = STATE.testText;

    // Combinar texto: anterior + espacio + nuevas palabras
    STATE.testText = currentText + ' ' + newWords;

    // Crear nuevo array de estados de caracteres
    const newCharStates = new Array(STATE.testText.length).fill('empty');

    // Copiar estados del texto anterior
    for (let i = 0; i < currentText.length; i++) {
      newCharStates[i] = currentStates[i];
    }

    // El espacio es 'empty', y nuevas palabras comienzan como 'empty'
    STATE.charStates = newCharStates;
    renderTextDisplay();
  }

  function setCharStateFromTyping(pos, typed, expected) {
    if (typed === expected) {
      if (STATE.charStates[pos] === 'incorrect') {
        STATE.incorrectChars = Math.max(0, STATE.incorrectChars - 1);
        STATE.correctedChars++;
      } else if (STATE.charStates[pos] !== 'correct') {
        STATE.correctChars++;
      }
      STATE.charStates[pos] = 'correct';
      return;
    }

    if (STATE.charStates[pos] === 'correct') {
      STATE.correctChars = Math.max(0, STATE.correctChars - 1);
      STATE.incorrectChars++;
    } else if (STATE.charStates[pos] !== 'incorrect') {
      STATE.incorrectChars++;
    }
    STATE.charStates[pos] = 'incorrect';
  }

  function rollbackCharState(pos) {
    if (pos < 0 || pos >= STATE.charStates.length) return;

    if (STATE.charStates[pos] === 'correct') {
      STATE.correctChars = Math.max(0, STATE.correctChars - 1);
    } else if (STATE.charStates[pos] === 'incorrect') {
      STATE.incorrectChars = Math.max(0, STATE.incorrectChars - 1);
      STATE.correctedChars++;
    }
    STATE.charStates[pos] = 'empty';
  }

  function commitCurrentWordAndAdvance() {
    const start = STATE.wordStartIndex;
    if (start >= STATE.testText.length) {
      endTest();
      return;
    }

    const nextSpace = STATE.testText.indexOf(' ', start);
    const wordEnd = nextSpace === -1 ? STATE.testText.length : nextSpace;
    const typedWord = ELEMENTS.testInput.value.slice(start, STATE.currentCharIndex);

    let mismatchStreak = 0;
    let maxMismatchStreak = 0;

    for (let i = start; i < wordEnd; i++) {
      const rel = i - start;
      const typed = typedWord[rel] || '';
      const expected = STATE.testText[i];

      if (typed === expected) {
        mismatchStreak = 0;
      } else {
        mismatchStreak += 1;
        maxMismatchStreak = Math.max(maxMismatchStreak, mismatchStreak);
      }

      setCharStateFromTyping(i, typed, expected);
    }

    if (nextSpace !== -1) {
      setCharStateFromTyping(nextSpace, ' ', ' ');
    }

    // Si hubo varias fallas seguidas, el sistema considera la palabra como errada
    // pero permite continuar al siguiente bloque sin bloquear el test.
    if (maxMismatchStreak >= 2) {
      for (let i = start; i < wordEnd; i++) {
        if (STATE.charStates[i] !== 'correct') {
          STATE.charStates[i] = 'incorrect';
        }
      }
    }

    const nextStart = nextSpace === -1 ? STATE.testText.length : nextSpace + 1;
    ELEMENTS.testInput.value = STATE.testText.slice(0, nextStart);
    STATE.currentCharIndex = nextStart;
    STATE.wordStartIndex = nextStart;
    STATE.prevInputLength = nextStart;

    updateLiveMetrics();
    renderTextDisplay();

    if (nextStart >= STATE.testText.length) {
      endTest();
    }
  }

  function startTest() {
    bumpUserCounter('testsStarted', 1);
    STATE.isTestActive = true;
    STATE.testStartTime = Date.now();
    STATE.elapsedTime = 0;
    STATE.correctChars = 0;
    STATE.incorrectChars = 0;
    STATE.correctedChars = 0;
    STATE.wpmHistory = [];
    STATE.prevInputLength = 0;
    STATE.wordStartIndex = 0;

    ELEMENTS.results.style.display = 'none';
    startActiveTimer();

    STATE.wpmSnapshotInterval = setInterval(() => {
      const elapsed = (Date.now() - STATE.testStartTime) / 60000;
      const wpm = elapsed > 0 ? Math.round((STATE.correctChars / 5) / elapsed) : 0;
      STATE.wpmHistory.push(wpm);
    }, 1000);

    playSound('start');
  }

  function endTest() {
    if (!STATE.isTestActive) return;

    STATE.isTestActive = false;
    STATE.elapsedTime = Date.now() - STATE.testStartTime;
    clearInterval(STATE.timerInterval);
    clearInterval(STATE.wpmSnapshotInterval);
    ELEMENTS.testInput.disabled = true;
    playSound('end');
    showResults();
  }

  function closeResults() {
    ELEMENTS.results.style.display = 'none';
    ELEMENTS.modalOverlay.style.display = 'none';
    rebuildTest();
  }

  function resetTest() {
    STATE.isTestActive = false;
    clearInterval(STATE.timerInterval);
    clearInterval(STATE.wpmSnapshotInterval);

    STATE.currentCharIndex = 0;
    STATE.wordStartIndex = 0;
    STATE.correctChars = 0;
    STATE.incorrectChars = 0;
    STATE.correctedChars = 0;
    STATE.wpmHistory = [];
    STATE.elapsedTime = 0;
    STATE.prevInputLength = 0;
    STATE.charStates = new Array(STATE.testText.length).fill('empty');

    ELEMENTS.testInput.value = '';
    ELEMENTS.results.style.display = 'none';
    ELEMENTS.modalOverlay.style.display = 'none';
    ELEMENTS.testInput.disabled = false;
    ELEMENTS.wpmValue.textContent = '0';
    ELEMENTS.accValue.textContent = '100%';
    updateTimerUiForMode();

    renderTextDisplay();
    ELEMENTS.testInput.focus();
  }

  function updateLiveMetrics() {
    STATE.elapsedTime = Math.max(1, Date.now() - STATE.testStartTime);
    const minutes = STATE.elapsedTime / 60000;
    const wpm = minutes > 0 ? Math.round((STATE.correctChars / 5) / minutes) : 0;
    const total = STATE.correctChars + STATE.incorrectChars;
    const acc = total > 0 ? Math.round((STATE.correctChars / total) * 100) : 100;
    ELEMENTS.wpmValue.textContent = wpm;
    ELEMENTS.accValue.textContent = acc + '%';
    if (STATE.currentType === 'texts') {
      ELEMENTS.timerValue.textContent = Math.floor(STATE.elapsedTime / 1000) + 's';
    }
  }

  function showResults() {
    const minutes = Math.max(1, STATE.elapsedTime) / 60000;
    const wpmExact = (STATE.correctChars / 5) / minutes;
    const wpm = Math.round(wpmExact);
    
    // Raw WPM: (todos los caracteres incluendo incorrectos) / tiempo en minutos
    const totalChars = STATE.correctChars + STATE.incorrectChars;
    const rawWpmExact = totalChars / 5 / minutes;
    const rawWpm = Math.round(rawWpmExact);
    
    const acc = totalChars > 0 ? (STATE.correctChars / totalChars) * 100 : 100;
    const accRounded = Math.round(acc);
    
    // Consistencia: variancia de velocidad (simplificada)
    let consistency = 100;
    if (STATE.wpmHistory.length > 1) {
      const avg = STATE.wpmHistory.reduce((a, b) => a + b) / STATE.wpmHistory.length;
      const variance = STATE.wpmHistory.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / STATE.wpmHistory.length;
      const stdDev = Math.sqrt(variance);
      consistency = Math.max(0, Math.min(100, 100 - (stdDev / avg * 100)));
    }
    
    const timeInSeconds = STATE.elapsedTime / 1000;
    const hours = Math.floor(timeInSeconds / 3600);
    const mins = Math.floor((timeInSeconds % 3600) / 60);
    const secs = Math.floor(timeInSeconds % 60);
    const timeFormatted = String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    
    // Desglose de caracteres: correct/incorrect/extra/missed
    // En este contexto: correct=STATE.correctChars, incorrect=STATE.incorrectChars, extra=0 (no escribimos más), missed=0 (no aplica)
    const extraChars = 0;
    const missedChars = 0;

    // Actualizar valores grandes
    $('resultWpmBig').textContent = wpm;
    $('resultWpmSmall').textContent = wpmExact.toFixed(2) + ' wpm';
    
    $('resultAccBig').textContent = accRounded + '%';
    $('resultAccSmall').textContent = acc.toFixed(2) + '% ' + STATE.correctChars + ' correct ' + STATE.incorrectChars + ' incorrect';
    
    $('resultRawWpmBig').textContent = rawWpm;
    $('resultRawWpmSmall').textContent = rawWpmExact.toFixed(2) + ' wpm';
    
    $('resultCharsBreakdown').textContent = STATE.correctChars + '/' + STATE.incorrectChars + '/' + extraChars + '/' + missedChars;
    
    $('resultConsistencyBig').textContent = Math.round(consistency) + '%';
    $('resultConsistencySmall').textContent = consistency.toFixed(2) + '%';
    
    $('resultTimeBig').textContent = Math.ceil(timeInSeconds) + 's';
    $('resultTimeSmall').textContent = timeFormatted;
    $('resultTimeExtra').textContent = timeInSeconds.toFixed(2) + 's afk 0%';
    
    $('resultTestType').textContent = STATE.currentType;
    const langDisplay = { es: 'spanish', en: 'english', fr: 'french', de: 'german', pt: 'portuguese' }[STATE.currentLanguage] || STATE.currentLanguage;
    $('resultTestLanguage').textContent = langDisplay;

    // Mostrar/ocultar nota de sesión
    const resultsNote = $('resultsNote');
    if (resultsNote) {
      resultsNote.style.display = STATE.currentUser ? 'none' : 'block';
    }

    // Guardar resultado si el usuario está logueado
    if (STATE.currentUser) {
      saveTestResult({
        wpm: wpm,
        rawWpm: rawWpmExact,
        acc: accRounded,
        consistency: consistency,
        chars: STATE.correctChars + STATE.incorrectChars,
        time: Math.ceil(timeInSeconds),
        type: STATE.currentType,
        duration: STATE.currentDuration,
        wordCount: 50,
        language: STATE.currentLanguage,
        difficulty: STATE.currentDifficulty,
        punctuation: STATE.optPunctuation ? 'on' : 'off',
        numbers: STATE.optNumbers ? 'on' : 'off'
      });
    }

    ELEMENTS.modalOverlay.style.display = 'block';
    ELEMENTS.results.style.display = 'block';
    drawWpmChart([...STATE.wpmHistory, wpm]);
  }

  function drawWpmChart(data) {
    const canvas = ELEMENTS.wpmChart;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth || 760;
    canvas.height = 260;

    const W = canvas.width;
    const H = canvas.height;
    const pad = { top: 24, right: 20, bottom: 44, left: 54 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const style = getComputedStyle(document.body);
    const accent = style.getPropertyValue('--accent-primary').trim() || '#e2b714';
    const textLight = style.getPropertyValue('--text-light').trim() || '#a8aab5';
    const bgSec = style.getPropertyValue('--bg-secondary').trim() || '#2c2e31';

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgSec;
    ctx.fillRect(0, 0, W, H);

    if (!data || data.length < 2) {
      ctx.fillStyle = textLight;
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Datos insuficientes', W / 2, H / 2);
      return;
    }

    const maxWpm = Math.max(...data, 10);
    const range = maxWpm || 1;
    const gridLines = 5;

    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    for (let i = 0; i <= gridLines; i++) {
      const y = pad.top + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.fillStyle = textLight;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridLines; i++) {
      const val = Math.round(maxWpm - (maxWpm / gridLines) * i);
      const y = pad.top + (chartH / gridLines) * i;
      ctx.fillText(val, pad.left - 8, y + 4);
    }

    ctx.fillStyle = textLight;
    ctx.textAlign = 'center';
    const maxLabels = Math.min(data.length, 12);
    const step = Math.max(1, Math.ceil(data.length / maxLabels));
    for (let i = 0; i < data.length; i += step) {
      const x = pad.left + (i / Math.max(data.length - 1, 1)) * chartW;
      ctx.fillText((i + 1) + 's', x, H - 12);
    }
    ctx.fillText(data.length + 's', pad.left + chartW, H - 12);

    const points = data.map((v, i) => ({
      x: pad.left + (i / Math.max(data.length - 1, 1)) * chartW,
      y: pad.top + chartH - (v / range) * chartH
    }));

    ctx.beginPath();
    ctx.moveTo(points[0].x, pad.top + chartH);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad.addColorStop(0, accent + '66');
    grad.addColorStop(1, accent + '00');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  }

  function drawProgressChart(period = '7days') {
    if (!STATE.currentUser) return;

    const canvas = ELEMENTS.progressChart;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth || 760;
    canvas.height = 260;

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userData = users[STATE.currentUser.email];
    if (!userData || !userData.tests || userData.tests.length === 0) {
      ctx.fillStyle = '#a8aab5';
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Sin datos de tests', canvas.width / 2, canvas.height / 2);
      return;
    }

    const now = new Date();
    const tests = userData.tests.filter(test => {
      const testDate = new Date(test.date);
      const daysAgo = (now - testDate) / (1000 * 60 * 60 * 24);
      
      if (period === '7days') return daysAgo <= 7;
      if (period === '30days') return daysAgo <= 30;
      if (period === '12months') return daysAgo <= 365;
      return true; // alltime
    });

    if (tests.length === 0) {
      ctx.fillStyle = '#a8aab5';
      ctx.font = '13px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Sin datos para este período', canvas.width / 2, canvas.height / 2);
      return;
    }

    let groupedData = {};
    let labels = [];

    if (period === '7days') {
      // Agrupar por día
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const key = date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
        groupedData[key] = [];
        labels.push(key);
      }
    } else if (period === '30days') {
      // Agrupar por semana
      for (let i = 4; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - (i * 7));
        const key = 'Sem ' + Math.floor(date.getDate() / 7 + 1);
        groupedData[key] = [];
        labels.push(key);
      }
    } else if (period === '12months') {
      // Agrupar por mes
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now);
        date.setMonth(date.getMonth() - i);
        const key = date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
        groupedData[key] = [];
        labels.push(key);
      }
    } else {
      // Agrupar por año
      const yearsSet = new Set();
      tests.forEach(test => {
        const year = new Date(test.date).getFullYear();
        yearsSet.add(year);
      });
      const years = Array.from(yearsSet).sort();
      years.forEach(year => {
        groupedData[year] = [];
        labels.push(year);
      });
    }

    // Llenar datos
    tests.forEach(test => {
      const testDate = new Date(test.date);
      let key;

      if (period === '7days') {
        key = testDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
      } else if (period === '30days') {
        key = 'Sem ' + Math.floor(testDate.getDate() / 7 + 1);
      } else if (period === '12months') {
        key = testDate.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
      } else {
        key = testDate.getFullYear();
      }

      if (groupedData[key]) {
        groupedData[key].push(test.wpm);
      }
    });

    // Calcular promedios
    const data = labels.map(label => {
      const wpmValues = groupedData[label];
      return wpmValues.length > 0 ? Math.round(wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length) : 0;
    });

    // Dibujar gráfica
    const W = canvas.width;
    const H = canvas.height;
    const pad = { top: 24, right: 20, bottom: 44, left: 54 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const style = getComputedStyle(document.body);
    const accent = style.getPropertyValue('--accent-primary').trim() || '#e2b714';
    const textLight = style.getPropertyValue('--text-light').trim() || '#a8aab5';
    const bgSec = style.getPropertyValue('--bg-secondary').trim() || '#2c2e31';

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgSec;
    ctx.fillRect(0, 0, W, H);

    const maxWpm = Math.max(...data, 10);
    const range = maxWpm || 1;
    const gridLines = 5;

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    for (let i = 0; i <= gridLines; i++) {
      const y = pad.top + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Y-axis labels
    ctx.fillStyle = textLight;
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridLines; i++) {
      const val = Math.round(maxWpm - (maxWpm / gridLines) * i);
      const y = pad.top + (chartH / gridLines) * i;
      ctx.fillText(val, pad.left - 8, y + 4);
    }

    // X-axis labels
    ctx.fillStyle = textLight;
    ctx.textAlign = 'center';
    for (let i = 0; i < labels.length; i++) {
      const x = pad.left + (i / Math.max(labels.length - 1, 1)) * chartW;
      ctx.fillText(labels[i], x, H - 12);
    }

    // Dibujar línea
    const points = data.map((v, i) => ({
      x: pad.left + (i / Math.max(data.length - 1, 1)) * chartW,
      y: pad.top + chartH - (v / range) * chartH
    }));

    ctx.beginPath();
    ctx.moveTo(points[0].x, pad.top + chartH);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad.addColorStop(0, accent + '66');
    grad.addColorStop(1, accent + '00');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();
  }

  function handleNavigation(e) {
    const sectionId = e.target.dataset.section;
    ELEMENTS.navButtons.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    ELEMENTS.sections.forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId)?.classList.add('active');
    if (sectionId !== 'test') pauseTest();
  }

  function pauseTest() {
    STATE.isTestActive = false;
    clearInterval(STATE.timerInterval);
    clearInterval(STATE.wpmSnapshotInterval);
  }

  function handleThemeChange(e) {
    const theme = e.target.dataset.theme;
    STATE.theme = theme;
    applyTheme(theme);
    localStorage.setItem('theme', theme);
    updateThemeButtons();
  }

  function applyTheme(theme) {
    document.body.className = 'dark-mode theme-' + theme;
  }

  function updateThemeButtons() {
    ELEMENTS.themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === STATE.theme);
    });
  }

  function handleGlobalShortcuts(e) {
    if (e.key === 'Tab') {
      STATE.lastTabPressAt = Date.now();
      return;
    }

    const tabEnterCombo = e.key === 'Enter' && (Date.now() - STATE.lastTabPressAt) <= 1500;
    if ((e.key === 'Enter' && e.ctrlKey) || tabEnterCombo) {
      e.preventDefault();
      triggerQuickRestart();
      return;
    }

    if (e.key === 'Escape') {
      const termsModal = $('termsModal');
      const termsModalOverlay = $('termsModalOverlay');
      if (termsModal && termsModal.style.display === 'block') {
        termsModal.style.display = 'none';
        termsModalOverlay.style.display = 'none';
      } else {
        pauseTest();
      }
    }
  }

  function triggerQuickRestart() {
    const termsModal = $('termsModal');
    const termsModalOverlay = $('termsModalOverlay');
    if (termsModal && termsModal.style.display === 'block') {
      termsModal.style.display = 'none';
      if (termsModalOverlay) termsModalOverlay.style.display = 'none';
    }

    const isResultsOpen = ELEMENTS.results && ELEMENTS.results.style.display === 'block';
    if (isResultsOpen) {
      closeResults();
      return;
    }
    rebuildTest();
  }

  function exportTestsCsv() {
    if (!STATE.currentUser) return;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const userData = users[STATE.currentUser.email];
    if (!userData || !userData.tests || userData.tests.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    const header = ['wpm', 'raw', 'accuracy', 'consistency', 'mode', 'language', 'difficulty', 'tags', 'date'];
    const rows = userData.tests.map(t => [
      Number(t.wpm || 0).toFixed(2),
      Number(t.rawWpm || t.wpm || 0).toFixed(2),
      Number(t.acc || 0).toFixed(2),
      Number(t.consistency || 0).toFixed(2),
      t.type || 'words',
      t.language || 'es',
      t.difficulty || '1k',
      (t.tags || []).join('|'),
      t.date || ''
    ]);

    const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'typehub-tests.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function playSound(type) {
    if (!STATE.soundEnabled) return;
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.frequency.value = type === 'start' ? 800 : 1200;
      gain.gain.setValueAtTime(0.08, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 0.15);
    } catch (_) { /* sin soporte */ }
  }

  function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
