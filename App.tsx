import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Shield,
  Smartphone,
  Clock,
  TrendingDown,
  Users,
  Lock,
  Zap,
  CheckCircle,
  XCircle,
  BarChart3,
  Activity,
  Database,
  Globe,
  MapPin,
  Search,
  Navigation,
  Scan,
  Monitor,
  FileText,
  Eye,
  Phone,
  PhoneCall,
  WifiOff,
  UserX,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

// Mapeamento de DDDs para estados
const DDD_TO_STATE = {
  // São Paulo
  '11': { state: 'SP', name: 'São Paulo', region: 'Sudeste' },
  '12': { state: 'SP', name: 'São Paulo', region: 'Sudeste' },
  '13': { state: 'SP', name: 'São Paulo', region: 'Sudeste' },
  '14': { state: 'SP', name: 'São Paulo', region: 'Sudeste' },
  '15': { state: 'SP', name: 'São Paulo', region: 'Sudeste' },
  '16': { state: 'SP', name: 'São Paulo', region: 'Sudeste' },
  '17': { state: 'SP', name: 'São Paulo', region: 'Sudeste' },
  '18': { state: 'SP', name: 'São Paulo', region: 'Sudeste' },
  '19': { state: 'SP', name: 'São Paulo', region: 'Sudeste' },
  
  // Rio de Janeiro
  '21': { state: 'RJ', name: 'Rio de Janeiro', region: 'Sudeste' },
  '22': { state: 'RJ', name: 'Rio de Janeiro', region: 'Sudeste' },
  '24': { state: 'RJ', name: 'Rio de Janeiro', region: 'Sudeste' },
  
  // Espírito Santo
  '27': { state: 'ES', name: 'Espírito Santo', region: 'Sudeste' },
  '28': { state: 'ES', name: 'Espírito Santo', region: 'Sudeste' },
  
  // Minas Gerais
  '31': { state: 'MG', name: 'Minas Gerais', region: 'Sudeste' },
  '32': { state: 'MG', name: 'Minas Gerais', region: 'Sudeste' },
  '33': { state: 'MG', name: 'Minas Gerais', region: 'Sudeste' },
  '34': { state: 'MG', name: 'Minas Gerais', region: 'Sudeste' },
  '35': { state: 'MG', name: 'Minas Gerais', region: 'Sudeste' },
  '37': { state: 'MG', name: 'Minas Gerais', region: 'Sudeste' },
  '38': { state: 'MG', name: 'Minas Gerais', region: 'Sudeste' },
  
  // Paraná
  '41': { state: 'PR', name: 'Paraná', region: 'Sul' },
  '42': { state: 'PR', name: 'Paraná', region: 'Sul' },
  '43': { state: 'PR', name: 'Paraná', region: 'Sul' },
  '44': { state: 'PR', name: 'Paraná', region: 'Sul' },
  '45': { state: 'PR', name: 'Paraná', region: 'Sul' },
  '46': { state: 'PR', name: 'Paraná', region: 'Sul' },
  
  // Santa Catarina
  '47': { state: 'SC', name: 'Santa Catarina', region: 'Sul' },
  '48': { state: 'SC', name: 'Santa Catarina', region: 'Sul' },
  '49': { state: 'SC', name: 'Santa Catarina', region: 'Sul' },
  
  // Rio Grande do Sul
  '51': { state: 'RS', name: 'Rio Grande do Sul', region: 'Sul' },
  '53': { state: 'RS', name: 'Rio Grande do Sul', region: 'Sul' },
  '54': { state: 'RS', name: 'Rio Grande do Sul', region: 'Sul' },
  '55': { state: 'RS', name: 'Rio Grande do Sul', region: 'Sul' },
  
  // Brasília/DF
  '61': { state: 'DF', name: 'Distrito Federal', region: 'Centro-Oeste' },
  
  // Goiás
  '62': { state: 'GO', name: 'Goiás', region: 'Centro-Oeste' },
  '64': { state: 'GO', name: 'Goiás', region: 'Centro-Oeste' },
  
  // Mato Grosso
  '65': { state: 'MT', name: 'Mato Grosso', region: 'Centro-Oeste' },
  '66': { state: 'MT', name: 'Mato Grosso', region: 'Centro-Oeste' },
  
  // Mato Grosso do Sul
  '67': { state: 'MS', name: 'Mato Grosso do Sul', region: 'Centro-Oeste' },
  
  // Acre
  '68': { state: 'AC', name: 'Acre', region: 'Norte' },
  
  // Rondônia
  '69': { state: 'RO', name: 'Rondônia', region: 'Norte' },
  
  // Bahia
  '71': { state: 'BA', name: 'Bahia', region: 'Nordeste' },
  '73': { state: 'BA', name: 'Bahia', region: 'Nordeste' },
  '74': { state: 'BA', name: 'Bahia', region: 'Nordeste' },
  '75': { state: 'BA', name: 'Bahia', region: 'Nordeste' },
  '77': { state: 'BA', name: 'Bahia', region: 'Nordeste' },
  
  // Sergipe
  '79': { state: 'SE', name: 'Sergipe', region: 'Nordeste' },
  
  // Pernambuco
  '81': { state: 'PE', name: 'Pernambuco', region: 'Nordeste' },
  '87': { state: 'PE', name: 'Pernambuco', region: 'Nordeste' },
  
  // Alagoas
  '82': { state: 'AL', name: 'Alagoas', region: 'Nordeste' },
  
  // Paraíba
  '83': { state: 'PB', name: 'Paraíba', region: 'Nordeste' },
  
  // Rio Grande do Norte
  '84': { state: 'RN', name: 'Rio Grande do Norte', region: 'Nordeste' },
  
  // Ceará
  '85': { state: 'CE', name: 'Ceará', region: 'Nordeste' },
  '88': { state: 'CE', name: 'Ceará', region: 'Nordeste' },
  
  // Piauí
  '86': { state: 'PI', name: 'Piauí', region: 'Nordeste' },
  '89': { state: 'PI', name: 'Piauí', region: 'Nordeste' },
  
  // Pará
  '91': { state: 'PA', name: 'Pará', region: 'Norte' },
  '93': { state: 'PA', name: 'Pará', region: 'Norte' },
  '94': { state: 'PA', name: 'Pará', region: 'Norte' },
  
  // Amazonas
  '92': { state: 'AM', name: 'Amazonas', region: 'Norte' },
  '97': { state: 'AM', name: 'Amazonas', region: 'Norte' },
  
  // Roraima
  '95': { state: 'RR', name: 'Roraima', region: 'Norte' },
  
  // Amapá
  '96': { state: 'AP', name: 'Amapá', region: 'Norte' },
  
  // Tocantins
  '63': { state: 'TO', name: 'Tocantins', region: 'Norte' },
  
  // Maranhão
  '98': { state: 'MA', name: 'Maranhão', region: 'Nordeste' },
  '99': { state: 'MA', name: 'Maranhão', region: 'Nordeste' },
};

// Estados com coordenadas SVG e paths reais
const BRAZIL_STATES_SVG = {
  'AC': {
    name: 'Acre',
    path: 'M158,380 L180,375 L185,360 L195,355 L200,340 L185,330 L175,325 L160,335 L150,350 L155,365 Z',
    center: { x: 175, y: 350 }
  },
  'AL': {
    name: 'Alagoas',
    path: 'M580,320 L590,315 L595,325 L590,335 L580,340 L575,330 Z',
    center: { x: 585, y: 328 }
  },
  'AP': {
    name: 'Amapá',
    path: 'M350,120 L370,115 L375,130 L370,145 L355,150 L345,135 Z',
    center: { x: 360, y: 132 }
  },
  'AM': {
    name: 'Amazonas',
    path: 'M180,220 L280,210 L320,220 L340,240 L330,280 L300,290 L250,285 L200,275 L170,250 Z',
    center: { x: 255, y: 250 }
  },
  'BA': {
    name: 'Bahia',
    path: 'M520,280 L560,275 L580,290 L585,320 L570,350 L540,360 L510,355 L500,320 L505,300 Z',
    center: { x: 540, y: 320 }
  },
  'CE': {
    name: 'Ceará',
    path: 'M550,200 L580,195 L590,210 L585,225 L570,230 L545,220 Z',
    center: { x: 567, y: 212 }
  },
  'DF': {
    name: 'Distrito Federal',
    path: 'M485,330 L490,325 L495,330 L490,335 Z',
    center: { x: 490, y: 330 }
  },
  'ES': {
    name: 'Espírito Santo',
    path: 'M580,380 L590,375 L595,385 L590,395 L580,390 Z',
    center: { x: 587, y: 385 }
  },
  'GO': {
    name: 'Goiás',
    path: 'M450,320 L500,315 L520,330 L515,360 L480,365 L445,350 Z',
    center: { x: 480, y: 340 }
  },
  'MA': {
    name: 'Maranhão',
    path: 'M450,180 L520,175 L540,190 L535,220 L510,225 L480,220 L445,200 Z',
    center: { x: 490, y: 200 }
  },
  'MT': {
    name: 'Mato Grosso',
    path: 'M380,320 L450,315 L470,340 L465,380 L430,385 L400,375 L375,350 Z',
    center: { x: 420, y: 350 }
  },
  'MS': {
    name: 'Mato Grosso do Sul',
    path: 'M420,380 L470,375 L480,400 L475,430 L450,435 L415,425 Z',
    center: { x: 447, y: 405 }
  },
  'MG': {
    name: 'Minas Gerais',
    path: 'M480,360 L550,355 L580,370 L575,400 L540,415 L500,420 L470,400 Z',
    center: { x: 525, y: 385 }
  },
  'PA': {
    name: 'Pará',
    path: 'M340,150 L450,145 L480,170 L475,220 L440,235 L380,230 L320,210 L335,180 Z',
    center: { x: 400, y: 190 }
  },
  'PB': {
    name: 'Paraíba',
    path: 'M590,240 L605,235 L610,250 L600,260 L585,255 Z',
    center: { x: 597, y: 247 }
  },
  'PR': {
    name: 'Paraná',
    path: 'M480,440 L530,435 L550,450 L545,480 L520,485 L475,475 Z',
    center: { x: 515, y: 460 }
  },
  'PE': {
    name: 'Pernambuco',
    path: 'M570,230 L600,225 L615,240 L610,265 L585,270 L560,260 Z',
    center: { x: 587, y: 247 }
  },
  'PI': {
    name: 'Piauí',
    path: 'M480,220 L530,215 L550,230 L545,260 L520,265 L475,255 Z',
    center: { x: 512, y: 240 }
  },
  'RJ': {
    name: 'Rio de Janeiro',
    path: 'M560,420 L585,415 L595,430 L590,445 L570,450 L555,435 Z',
    center: { x: 575, y: 432 }
  },
  'RN': {
    name: 'Rio Grande do Norte',
    path: 'M590,210 L610,205 L620,220 L610,235 L590,240 L585,225 Z',
    center: { x: 602, y: 222 }
  },
  'RS': {
    name: 'Rio Grande do Sul',
    path: 'M480,485 L540,480 L560,500 L555,540 L520,545 L475,535 Z',
    center: { x: 517, y: 512 }
  },
  'RO': {
    name: 'Rondônia',
    path: 'M280,290 L320,285 L340,300 L335,330 L310,335 L275,325 Z',
    center: { x: 307, y: 310 }
  },
  'RR': {
    name: 'Roraima',
    path: 'M280,100 L320,95 L340,110 L335,140 L310,145 L275,135 Z',
    center: { x: 307, y: 120 }
  },
  'SC': {
    name: 'Santa Catarina',
    path: 'M520,485 L560,480 L580,495 L575,515 L550,520 L515,510 Z',
    center: { x: 547, y: 500 }
  },
  'SP': {
    name: 'São Paulo',
    path: 'M520,420 L570,415 L590,430 L585,460 L560,465 L515,455 Z',
    center: { x: 555, y: 440 }
  },
  'SE': {
    name: 'Sergipe',
    path: 'M585,270 L595,265 L600,275 L595,285 L585,280 Z',
    center: { x: 592, y: 275 }
  },
  'TO': {
    name: 'Tocantins',
    path: 'M440,235 L480,230 L500,250 L495,290 L470,295 L435,285 Z',
    center: { x: 467, y: 262 }
  }
};

// Componente de prevenção de saída
const useExitPrevention = () => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Tem certeza que deseja sair? Seus dados podem estar em risco!";
    };

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload,
      );
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
};

// Componente de Gráfico Circular Melhorado
const ProfessionalPieChart = ({
  data,
  size = 120,
}: {
  data: Array<{ name: string; value: number; color: string }>;
  size?: number;
}) => {
  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            startAngle={90}
            endAngle={-270}
            innerRadius={size * 0.3}
            outerRadius={size * 0.45}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-black text-gray-800">
            {data[0]?.value}%
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente do Mapa Real do Brasil Melhorado
const BrazilMap = ({ threats }: { threats: any[] }) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const threatenedStates = new Set(threats.map(t => t.state));

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
      <svg
        viewBox="0 0 720 600"
        className="w-full h-full"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
      >
        {/* Definições para gradientes e filtros */}
        <defs>
          <linearGradient id="normalState" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="threatenedState" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="hoveredState" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="orangeGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feFlood floodColor="#f97316" floodOpacity="0.6"/>
            <feComposite in="flood" in2="coloredBlur" operator="in"/>
            <feMerge> 
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Título do mapa */}
        <text
          x="360"
          y="35"
          textAnchor="middle"
          fill="#64748b"
          fontSize="18"
          fontWeight="500"
        >
          Análise de Atividade por Região
        </text>

        {/* Estados do Brasil */}
        {Object.entries(BRAZIL_STATES_SVG).map(([stateCode, stateData]) => {
          const isThreatenedState = threatenedStates.has(stateCode);
          const isHovered = hoveredState === stateCode;
          
          return (
            <g key={stateCode}>
              <path
                d={stateData.path}
                fill={
                  isHovered
                    ? "url(#hoveredState)"
                    : isThreatenedState
                    ? "url(#threatenedState)"
                    : "url(#normalState)"
                }
                stroke="#64748b"
                strokeWidth="1.5"
                filter={isThreatenedState ? "url(#orangeGlow)" : undefined}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isThreatenedState ? 1 : 0.9
                }}
                onMouseEnter={() => setHoveredState(stateCode)}
                onMouseLeave={() => setHoveredState(null)}
              />
              
              {/* Label do estado */}
              <text
                x={stateData.center.x}
                y={stateData.center.y}
                textAnchor="middle"
                fill={isThreatenedState ? "#ffffff" : "#1e293b"}
                fontSize="10"
                fontWeight="500"
                style={{ pointerEvents: 'none' }}
              >
                {stateCode}
              </text>
            </g>
          );
        })}

        {/* Marcadores de ameaças com animações */}
        {threats.map((threat, index) => {
          const stateData = BRAZIL_STATES_SVG[threat.state];
          if (!stateData) return null;

          const { x, y } = stateData.center;
          
          return (
            <g key={`threat-${index}`}>
              {/* Círculo pulsante externo */}
              <circle
                cx={x}
                cy={y}
                r="20"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values="20;30;20"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.2;0.6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* Círculo médio */}
              <circle
                cx={x}
                cy={y}
                r="12"
                fill="none"
                stroke="#fb923c"
                strokeWidth="2"
                opacity="0.8"
              >
                <animate
                  attributeName="r"
                  values="12;18;12"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* Ponto central */}
              <circle
                cx={x}
                cy={y}
                r="6"
                fill="#f97316"
                filter="url(#orangeGlow)"
              >
                <animate
                  attributeName="r"
                  values="6;8;6"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* Label flutuante com nome do estado */}
              <rect
                x={x - 25}
                y={y - 35}
                width="50"
                height="18"
                fill="rgba(249, 115, 22, 0.95)"
                rx="4"
                ry="4"
                stroke="#ffffff"
                strokeWidth="1"
              />
              <text
                x={x}
                y={y - 23}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontWeight="500"
              >
                {threat.state}
              </text>
            </g>
          );
        })}

        {/* Legenda melhorada */}
        <g transform="translate(30, 520)">
          <rect x="0" y="0" width="200" height="70" fill="rgba(255, 255, 255, 0.95)" rx="8" ry="8" stroke="#e2e8f0" strokeWidth="1" />
          
          <text x="15" y="20" fill="#1e293b" fontSize="12" fontWeight="500">
            Legenda:
          </text>
          
          <circle cx="25" cy="40" r="6" fill="url(#normalState)" stroke="#64748b" strokeWidth="1" />
          <text x="40" y="45" fill="#475569" fontSize="10" fontWeight="400">
            Atividade normal
          </text>
          
          <circle cx="25" cy="60" r="6" fill="url(#threatenedState)" />
          <text x="40" y="65" fill="#ea580c" fontSize="10" fontWeight="500">
            Atividade suspeita
          </text>
        </g>

        {/* Contador de ameaças melhorado */}
        <g transform="translate(490, 530)">
          <rect x="0" y="0" width="160" height="50" fill="rgba(249, 115, 22, 0.95)" rx="8" ry="8" stroke="#ffffff" strokeWidth="1" />
          <text x="80" y="20" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="500">
            Regiões Analisadas
          </text>
          <text x="80" y="40" textAnchor="middle" fill="#fed7aa" fontSize="16" fontWeight="600">
            {threats.length} detectadas
          </text>
        </g>
      </svg>

      {/* Tooltip melhorado para estado em hover */}
      {hoveredState && (
        <div className="absolute top-4 left-4 bg-white text-gray-800 p-3 rounded-lg border border-gray-200 shadow-lg">
          <p className="font-medium text-blue-600">{BRAZIL_STATES_SVG[hoveredState].name}</p>
          <p className="text-sm text-gray-600">
            {threatenedStates.has(hoveredState) 
              ? "Atividade suspeita detectada" 
              : "Nenhuma atividade suspeita"}
          </p>
        </div>
      )}
    </div>
  );
};

// Página 1: Landing Clean e Profissional estilo Apple
const Page1 = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto p-8 pt-16">
        {/* Header Minimalista */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-light text-slate-900 mb-3">
            CyberShield
          </h1>
          <p className="text-slate-600 text-lg font-light">
            Análise avançada de segurança móvel
          </p>
        </div>

        {/* Seção Principal */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-slate-900 mb-4 font-light">
              Verifique a segurança do seu dispositivo
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Uma análise completa e gratuita que identifica vulnerabilidades 
              e riscos de segurança em seu smartphone.
            </p>
          </div>

          {/* Recursos */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Scan className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-slate-900 font-medium">Análise instantânea</p>
                <p className="text-sm text-slate-600">Verificação completa em 60 segundos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-slate-900 font-medium">100% seguro</p>
                <p className="text-sm text-slate-600">Seus dados não são armazenados</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-slate-900 font-medium">Relatório detalhado</p>
                <p className="text-sm text-slate-600">Recomendações personalizadas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas Discretas */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-light text-slate-900 mb-1">2.3M</p>
            <p className="text-sm text-slate-600">Dispositivos analisados</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-100">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-2xl font-light text-slate-900 mb-1">89%</p>
            <p className="text-sm text-slate-600">Apresentam vulnerabilidades</p>
          </div>
        </div>

        {/* CTA Principal */}
        <button
          onClick={onNext}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg mb-6"
        >
          <span className="text-lg font-medium">Iniciar análise gratuita</span>
        </button>

        {/* Certificação */}
        <div className="flex items-center justify-center gap-2 text-slate-500">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">Certificado ISO 27001</span>
        </div>
      </div>
    </div>
  );
};

// Página 2: Notícia Melhorada
const Page2 = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto p-6 pt-8">
        {/* Header de Notícia */}
        <div className="bg-amber-600 text-white p-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="font-medium">Alerta de Segurança</span>
          </div>
        </div>

        {/* Corpo da Notícia */}
        <div className="bg-white text-slate-800 rounded-b-2xl shadow-lg mb-8 border-x border-b border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&h=200"
            alt="Cyber security threat"
            className="w-full h-48 object-cover"
          />

          <div className="p-6">
            <h2 className="text-xl font-medium mb-4 text-slate-900 leading-tight">
              Nova campanha de malware compromete 2,3 milhões de
              dispositivos móveis
            </h2>

            <p className="text-base mb-4 leading-relaxed text-slate-700">
              Pesquisadores de segurança identificaram uma
              sofisticada campanha que exploita vulnerabilidades
              em sistemas Android e iOS, comprometendo dados
              bancários e informações pessoais.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-amber-800 font-medium text-sm">
                    Especialistas recomendam verificação imediata
                  </p>
                  <p className="text-amber-700 text-sm mt-1">
                    Janela de proteção: 24 horas
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-50 p-3 rounded-lg">
              <Globe className="w-4 h-4" />
              <span>
                Instituto de Segurança Cibernética • 2h
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Verificar meu dispositivo
        </button>
      </div>
    </div>
  );
};

// Ícone Apple SVG
const AppleIcon = () => (
  <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.4573 16.7461C22.4286 13.2031 25.4668 11.4956 25.6025 11.4165C24.0713 9.2021 21.6943 8.8667 20.8379 8.8406C18.7251 8.6167 16.6836 10.082 15.6045 10.082C14.5058 10.082 12.8315 8.8667 11.0825 8.9019C8.84717 8.9371 6.74658 10.2441 5.56885 12.2769C3.12915 16.4443 4.94775 22.5859 7.29395 25.9268C8.46777 27.5469 9.83594 29.3525 11.585 29.2891C13.2969 29.2188 13.9487 28.2549 16.0498 28.2549C18.1323 28.2549 18.7461 29.2891 20.5352 29.2471C22.3765 29.2188 23.5547 27.6421 24.6919 26.0088C26.0391 24.1274 26.5698 22.2764 26.5918 22.1836C26.5503 22.1689 22.4902 20.6377 22.4573 16.7461Z" fill="currentColor"/>
    <path d="M18.8066 6.52441C19.7788 5.35254 20.4043 3.77246 20.2251 2.17871C18.8438 2.23633 17.1191 3.09375 16.1099 4.24707C15.2114 5.25293 14.4492 6.87793 14.6465 8.41699C16.1855 8.52051 17.7656 7.64453 18.8066 6.52441Z" fill="currentColor"/>
  </svg>
);

// Ícone Android SVG
const AndroidIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 11H8.5V25C8.5 26.1046 9.39543 27 10.5 27H12.5V30.5C12.5 31.3284 13.1716 32 14 32C14.8284 32 15.5 31.3284 15.5 30.5V27H16.5V30.5C16.5 31.3284 17.1716 32 18 32C18.8284 32 19.5 31.3284 19.5 30.5V27H21.5C22.6046 27 23.5 26.1046 23.5 25V11H26.5C27.3284 11 28 10.3284 28 9.5C28 8.67157 27.3284 8 26.5 8H5.5C4.67157 8 4 8.67157 4 9.5C4 10.3284 4.67157 11 5.5 11Z" fill="currentColor"/>
    <path d="M10.5 6C10.5 4.89543 11.3954 4 12.5 4H19.5C20.6046 4 21.5 4.89543 21.5 6V8H10.5V6Z" fill="currentColor"/>
    <circle cx="13.5" cy="5.5" r="0.75" fill="#ffffff"/>
    <circle cx="18.5" cy="5.5" r="0.75" fill="#ffffff"/>
    <path d="M6.5 11C5.67157 11 5 11.6716 5 12.5V20.5C5 21.3284 5.67157 22 6.5 22C7.32843 22 8 21.3284 8 20.5V12.5C8 11.6716 7.32843 11 6.5 11Z" fill="currentColor"/>
    <path d="M25.5 11C24.6716 11 24 11.6716 24 12.5V20.5C24 21.3284 24.6716 22 25.5 22C26.3284 22 27 21.3284 27 20.5V12.5C27 11.6716 26.3284 11 25.5 11Z" fill="currentColor"/>
  </svg>
);

// Página 3: Seleção de Dispositivo com Ícones Reais
const Page3 = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto p-6 pt-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-light text-slate-900 mb-4">
            Selecione sua plataforma
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Cada sistema operacional possui características específicas
            de segurança que serão analisadas
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div
            onClick={onNext}
            className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
                  <AppleIcon />
                </div>
                <div>
                  <h3 className="font-medium text-xl text-slate-900">
                    iOS / iPhone
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-amber-700 font-medium text-sm">
                      Vulnerabilidade detectada: 73%
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Sistema amplamente utilizado no Brasil
                  </p>
                </div>
              </div>
              <div className="text-slate-400">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div
            onClick={onNext}
            className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center text-green-700">
                  <AndroidIcon />
                </div>
                <div>
                  <h3 className="font-medium text-xl text-slate-900">Android</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-medium text-sm">
                      Vulnerabilidade crítica: 89%
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Plataforma mais visada por criminosos
                  </p>
                </div>
              </div>
              <div className="text-slate-400">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-slate-600" />
            <span className="font-medium text-slate-900">
              Análise em tempo real
            </span>
          </div>
          <p className="text-sm text-slate-600">
            Novo ataque detectado a cada 39 segundos
          </p>
        </div>
      </div>
    </div>
  );
};

// Página 4: Input de DDD com Auto-início
const Page4 = ({ onNext, setUserDDD }: { onNext: () => void; setUserDDD: (ddd: string) => void }) => {
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [autoStartTimer, setAutoStartTimer] = useState(0);

  // Auto-início da análise após 4 segundos se o campo estiver preenchido
  useEffect(() => {
    if (inputValue.length === 5 && !isAnalyzing && autoStartTimer === 0) {
      const timer = setTimeout(() => {
        if (inputValue.length === 5 && !isAnalyzing) {
          handleAutoSubmit();
        }
      }, 4000);

      setAutoStartTimer(4);
      const countdown = setInterval(() => {
        setAutoStartTimer(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdown);
      };
    }
  }, [inputValue, isAnalyzing]);

  const handleAutoSubmit = () => {
    setIsAnalyzing(true);
    setUserDDD(inputValue);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      onNext();
    }, 3000);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.length !== 5) {
      alert('Por favor, digite exatamente 5 dígitos (DDD + 2 primeiros números)');
      return;
    }

    handleAutoSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto p-6 pt-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-light text-slate-900 mb-4">
            Análise por região
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Para uma análise mais precisa, precisamos verificar 
            padrões de atividade em sua região
          </p>
        </div>

        {/* Informação sobre a análise */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Search className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium mb-2 text-slate-900">
                Análise geográfica
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">
                Vamos verificar padrões de atividade suspeita em sua região 
                para identificar possíveis vulnerabilidades específicas.
              </p>
            </div>
          </div>
        </div>

        {/* Formulário de DDD Melhorado */}
        <form onSubmit={handleManualSubmit} className="mb-8">
          <label className="block text-slate-900 font-medium mb-4 text-lg">
            Digite seu DDD + 2 primeiros dígitos:
          </label>
          
          <div className="relative mb-4">
            <div className="flex">
              <div className="bg-slate-100 border-2 border-slate-200 border-r-0 rounded-l-2xl px-6 py-5 text-slate-700 font-bold text-lg">
                +55
              </div>
              <input
                type="tel"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="11987"
                className="flex-1 bg-white border-2 border-slate-200 border-l-0 rounded-r-2xl px-6 py-5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 font-bold text-lg"
                maxLength={5}
                required
                disabled={isAnalyzing}
              />
            </div>
            
            {/* Indicador de auto-início */}
            {autoStartTimer > 0 && inputValue.length === 5 && (
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Auto-início em {autoStartTimer}s...
                </span>
              </div>
            )}
          </div>
          
          <p className="text-slate-600 text-sm mb-6 bg-slate-50 p-4 rounded-lg font-medium">
            💡 Exemplo: 11987 (DDD 11 + primeiros dígitos 98)
          </p>
          
          <button
            type="submit"
            disabled={isAnalyzing || inputValue.length !== 5}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 text-lg"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full"></div>
                <span>Analisando padrões...</span>
              </>
            ) : (
              <>
                <Search className="w-6 h-6" />
                <span>Iniciar análise regional</span>
              </>
            )}
          </button>
        </form>

        {/* Nota de Segurança */}
        <div className="flex items-center justify-center gap-2 text-slate-500 bg-slate-50 rounded-lg p-3">
          <Lock className="w-4 h-4" />
          <span className="text-sm">
            Dados criptografados e não armazenados
          </span>
        </div>

        {/* Indicador de Progresso durante Análise */}
        {isAnalyzing && (
          <div className="mt-6 bg-white rounded-2xl p-5 border-2 border-blue-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="text-slate-900 font-medium">
                Analisando base de dados regional...
              </span>
            </div>
            <div className="bg-slate-100 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-600 to-slate-900 h-3 rounded-full animate-pulse transition-all duration-1000" style={{ width: '70%' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Página 5: Mapa de Ameaças com Informações Realistas
const Page5 = ({ onNext, userDDD }: { onNext: () => void; userDDD: string }) => {
  const [threats, setThreats] = useState<any[]>([]);
  const [currentThreat, setCurrentThreat] = useState(0);

  // Gerar ameaças realistas baseadas no DDD
  const generateRealisticThreats = (ddd: string) => {
    const dddCode = ddd.substring(0, 2);
    const userState = DDD_TO_STATE[dddCode];
    
    if (!userState) {
      return [];
    }

    // Estados para gerar ameaças (diferentes do estado do usuário)
    const allStates = Object.keys(BRAZIL_STATES_SVG).filter(state => state !== userState.state);
    
    // Selecionar 4 estados aleatórios
    const selectedStates = allStates.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    // Ameaças realistas com locais específicos de risco
    const realisticThreats = [
      {
        type: 'Tentativa de acesso em shopping center',
        description: 'Wi-Fi público comprometido para roubo de dados',
        risk: 'Roubo de senhas e dados bancários'
      },
      {
        type: 'Atividade suspeita em estação de metrô',
        description: 'Uso de equipamento para clonagem de cartões',
        risk: 'Furto de informações financeiras'
      },
      {
        type: 'Conexão não autorizada em aeroporto',
        description: 'Rede falsa criada para interceptar dados',
        risk: 'Acesso a emails e redes sociais'
      },
      {
        type: 'Acesso irregular em universidade',
        description: 'Hotspot malicioso em campus universitário',
        risk: 'Comprometimento de dados acadêmicos'
      },
      {
        type: 'Tentativa de fraude em hospital',
        description: 'Interceptação de dados pessoais sensíveis',
        risk: 'Roubo de identidade médica'
      },
      {
        type: 'Atividade em centro comercial',
        description: 'Skimming digital em pontos de pagamento',
        risk: 'Clonagem de cartões e senhas'
      }
    ];

    return selectedStates.map((state, index) => {
      const stateInfo = BRAZIL_STATES_SVG[state];
      const threat = realisticThreats[index % realisticThreats.length];
      const hoursAgo = Math.floor(Math.random() * 8) + 1;
      const minutesAgo = Math.floor(Math.random() * 60);
      
      return {
        state,
        name: stateInfo.name,
        type: threat.type,
        description: threat.description,
        risk: threat.risk,
        time: `${hoursAgo}h${minutesAgo}min atrás`,
        severity: Math.random() > 0.6 ? 'ALTA' : 'MÉDIA'
      };
    });
  };

  useEffect(() => {
    if (userDDD) {
      const generatedThreats = generateRealisticThreats(userDDD);
      setThreats(generatedThreats);
      
      // Animar a aparição das ameaças
      generatedThreats.forEach((_, index) => {
        setTimeout(() => {
          setCurrentThreat(index + 1);
        }, (index + 1) * 1500);
      });
    }
  }, [userDDD]);

  const userStateInfo = DDD_TO_STATE[userDDD?.substring(0, 2)];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto p-6 pt-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Navigation className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-light text-slate-900 mb-2">
            Análise Regional Concluída
          </h2>
          <p className="text-slate-600">
            Verificando atividades do número <span className="font-medium text-slate-900">{userDDD}XX-XXXX</span>
          </p>
          {userStateInfo && (
            <p className="text-sm text-slate-500 mt-2 bg-slate-100 p-2 rounded-lg">
              Origem: {userStateInfo.name} ({userStateInfo.state})
            </p>
          )}
        </div>

        {/* Contador de Ameaças */}
        <div className="bg-amber-500 rounded-2xl p-5 mb-6 text-center text-white shadow-lg">
          <div className="text-3xl font-light mb-2">
            {threats.length}
          </div>
          <p className="font-medium">
            Locais de risco identificados
          </p>
        </div>

        {/* Mapa do Brasil */}
        <div className="mb-6">
          <BrazilMap threats={threats.slice(0, currentThreat)} />
        </div>

        {/* Lista de Ameaças Realistas */}
        <div className="space-y-3 mb-6">
          <h3 className="font-medium text-lg text-slate-900 mb-4 bg-slate-100 p-3 rounded-lg">
            Atividades Detectadas:
          </h3>
          
          {threats.slice(0, currentThreat).map((threat, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
              style={{
                animation: 'fadeIn 0.5s ease-out'
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-slate-900">
                      {threat.name} ({threat.state})
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium text-white ${threat.severity === 'ALTA' ? 'bg-amber-600' : 'bg-slate-500'}`}>
                      {threat.severity}
                    </span>
                  </div>
                  <p className="font-medium text-slate-700 mb-1">
                    {threat.type}
                  </p>
                  <p className="text-sm text-slate-600 mb-1">
                    {threat.description}
                  </p>
                  <p className="text-sm text-red-600 font-medium mb-1">
                    Risco: {threat.risk}
                  </p>
                  <p className="text-xs text-slate-500">
                    🕐 {threat.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Análise Final */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-6 text-center text-white shadow-lg">
          <h3 className="font-medium text-xl mb-3">
            Análise de Vulnerabilidade
          </h3>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Foram identificadas atividades de risco em {threats.length} regiões diferentes, 
            indicando possível exposição em locais públicos.
          </p>
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="font-medium">
              Nível de risco: <span className="text-amber-400">ELEVADO</span>
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Continuar análise
        </button>

        <div className="mt-4 text-center">
          <p className="text-slate-600 text-sm bg-slate-50 p-3 rounded-lg">
            Recomendamos verificação completa de segurança
          </p>
        </div>
      </div>
    </div>
  );
};

// Página 6: Pergunta Simplificada e Destacada
const Page6 = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto p-6 pt-16">
        
        {/* Pergunta Principal Destacada */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-light text-slate-900 mb-6 leading-tight">
            Você usa seu celular em locais públicos?
          </h2>
        </div>

        {/* 3 Botões Simples */}
        <div className="space-y-4 mb-8">
          <button
            onClick={onNext}
            className="w-full bg-red-500 hover:bg-red-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg text-white"
          >
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">
                Sempre
              </h3>
              <p className="text-red-100 text-sm">
                Uso diariamente em ruas, transporte, etc.
              </p>
            </div>
          </button>

          <button
            onClick={onNext}
            className="w-full bg-amber-500 hover:bg-amber-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg text-white"
          >
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">
                Às vezes
              </h3>
              <p className="text-amber-100 text-sm">
                Quando necessário
              </p>
            </div>
          </button>

          <button
            onClick={onNext}
            className="w-full bg-slate-500 hover:bg-slate-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg text-white"
          >
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">
                Raramente
              </h3>
              <p className="text-slate-300 text-sm">
                Prefiro evitar
              </p>
            </div>
          </button>
        </div>

        {/* Aviso WiFi no rodapé */}
        <div className="bg-slate-100 rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <WifiOff className="w-5 h-5 text-slate-600" />
            <span className="font-medium text-slate-900">Fato importante</span>
          </div>
          <p className="text-slate-700 text-sm">
            1 em cada 3 brasileiros já teve dados roubados por observação em público
          </p>
        </div>
      </div>
    </div>
  );
};

// Página 7: Pergunta sobre Privacidade Simplificada
const Page7 = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto p-6 pt-16">
        
        {/* Pergunta Principal Destacada */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <UserX className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-light text-slate-900 mb-6 leading-tight">
            Se preocupa com sua privacidade digital?
          </h2>
        </div>

        {/* 3 Botões Simples */}
        <div className="space-y-4 mb-8">
          <button
            onClick={onNext}
            className="w-full bg-red-600 hover:bg-red-700 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg text-white"
          >
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">
                Muito preocupado
              </h3>
              <p className="text-red-100 text-sm">
                Minha privacidade é essencial
              </p>
            </div>
          </button>

          <button
            onClick={onNext}
            className="w-full bg-orange-500 hover:bg-orange-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg text-white"
          >
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">
                Sim, me preocupo
              </h3>
              <p className="text-orange-100 text-sm">
                Prefiro estar protegido
              </p>
            </div>
          </button>

          <button
            onClick={onNext}
            className="w-full bg-slate-500 hover:bg-slate-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg text-white"
          >
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">
                Não muito
              </h3>
              <p className="text-slate-300 text-sm">
                Todos merecem privacidade
              </p>
            </div>
          </button>
        </div>

        {/* Estatística */}
        <div className="bg-slate-900 rounded-2xl p-5 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-red-400" />
            <span className="font-medium">Estatística preocupante</span>
          </div>
          <p className="text-slate-300 text-sm">
            A cada 11 segundos, dados íntimos são expostos na internet
          </p>
        </div>
      </div>
    </div>
  );
};

// Página 8: Pergunta sobre Ligações Simplificada
const Page8 = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto p-6 pt-16">
        
        {/* Pergunta Principal Destacada */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <PhoneCall className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-light text-slate-900 mb-6 leading-tight">
            Recebe ligações de desconhecidos?
          </h2>
        </div>

        {/* 3 Botões Simples */}
        <div className="space-y-4 mb-8">
          <button
            onClick={onNext}
            className="w-full bg-red-500 hover:bg-red-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg text-white"
          >
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">
                Constantemente
              </h3>
              <p className="text-red-100 text-sm">
                Várias por dia, é um pesadelo
              </p>
            </div>
          </button>

          <button
            onClick={onNext}
            className="w-full bg-amber-500 hover:bg-amber-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg text-white"
          >
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">
                Às vezes
              </h3>
              <p className="text-amber-100 text-sm">
                Algumas ligações suspeitas
              </p>
            </div>
          </button>

          <button
            onClick={onNext}
            className="w-full bg-slate-500 hover:bg-slate-600 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg text-white"
          >
            <div className="text-center">
              <h3 className="font-medium text-xl mb-1">
                Raramente
              </h3>
              <p className="text-slate-300 text-sm">
                Dados parecem protegidos
              </p>
            </div>
          </button>
        </div>

        {/* Impacto Financeiro */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-5 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-yellow-300" />
            <span className="font-medium">Impacto financeiro</span>
          </div>
          <p className="text-red-100 text-sm">
            Brasileiros perdem R$ 2,9 bilhões por ano com golpes telefônicos
          </p>
        </div>
      </div>
    </div>
  );
};

// Página 9: Análise Avançada SEM Monitor Cardíaco
const Page9 = ({ onNext }: { onNext: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentAnalysis, setCurrentAnalysis] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const analysisSteps = [
    "Analisando padrões de vulnerabilidade...",
    "Calculando nível de risco pessoal...",
    "Verificando exposição de dados...",
    "Avaliando impacto na privacidade...",
    "Gerando relatório de segurança...",
  ];

  const riskData = [
    { name: 'Dados Pessoais', value: 85, color: '#ef4444' },
    { name: 'Privacidade', value: 78, color: '#f97316' },
    { name: 'Segurança Financeira', value: 82, color: '#dc2626' },
    { name: 'Proteção Geral', value: 25, color: '#22c55e' },
  ];

  const threatPeaksData = [
    { time: '08:00', threats: 45 },
    { time: '10:00', threats: 62 },
    { time: '12:00', threats: 58 },
    { time: '14:00', threats: 71 },
    { time: '16:00', threats: 85 },
    { time: '18:00', threats: 92 },
    { time: '20:00', threats: 88 },
    { time: '22:00', threats: 73 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1.5;
        const stepIndex = Math.floor((newProgress / 100) * analysisSteps.length);
        setCurrentAnalysis(Math.min(stepIndex, analysisSteps.length - 1));

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowResults(true), 1000);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-md mx-auto p-6 pt-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h2 className="text-2xl font-light text-slate-900 mb-4">
              Análise Avançada em Andamento
            </h2>
            <p className="text-slate-600">
              Processando suas respostas e calculando o nível de risco
            </p>
          </div>

          {/* Barra de Progresso */}
          <div className="mb-6">
            <div className="bg-slate-200 rounded-full h-3 mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-slate-600 text-sm">Progresso da análise</p>
              <p className="font-bold text-xl text-orange-600">{Math.round(progress)}%</p>
            </div>
          </div>

          {/* Etapas da Análise */}
          <div className="space-y-3 mb-8">
            {analysisSteps.map((step, index) => {
              const isActive = index === currentAnalysis;
              const isCompleted = index < currentAnalysis;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-orange-50 border border-orange-200"
                      : isCompleted
                        ? "bg-green-50 border border-green-200"
                        : "bg-slate-50 border border-slate-200"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive
                        ? "bg-orange-500 text-white animate-pulse"
                        : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-slate-300 text-slate-600"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  <span
                    className={`text-sm ${
                      isActive
                        ? "text-orange-700 font-medium"
                        : isCompleted
                          ? "text-green-700"
                          : "text-slate-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {progress > 90 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
              <p className="text-red-700 font-medium text-sm">
                ⚠️ Vulnerabilidades críticas detectadas
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto p-6 pt-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-light text-slate-900 mb-2">
            Análise Concluída
          </h2>
          <p className="text-slate-600">
            Relatório detalhado de vulnerabilidades
          </p>
        </div>

        {/* Resultado Principal */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 mb-6 text-center text-white shadow-lg">
          <h3 className="font-medium text-xl mb-2">
            Nível de Risco Detectado
          </h3>
          <div className="text-4xl font-light mb-2">89%</div>
          <p className="text-red-100">
            Classificação: <span className="font-bold">CRÍTICO</span>
          </p>
        </div>

        {/* Gráfico de Picos de Ameaças */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-200 shadow-sm">
          <h3 className="font-medium mb-4 text-slate-900 text-center">Picos de Ameaças Detectadas (24h)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={threatPeaksData}>
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Area 
                  type="monotone" 
                  dataKey="threats" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorThreats)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráficos de Risco Centralizados */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-200 shadow-sm">
          <h3 className="font-medium mb-4 text-slate-900 text-center">Vulnerabilidades por Categoria</h3>
          <div className="space-y-4">
            {riskData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  <span className="text-sm font-bold" style={{ color: item.color }}>{item.value}%</span>
                </div>
                <div className="bg-slate-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${item.value}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo dos Riscos */}
        <div className="space-y-3 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Exposição em Locais Públicos</p>
                <p className="text-sm text-red-700">Dados vulneráveis a interceptação</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <UserX className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800">Privacidade Comprometida</p>
                <p className="text-sm text-orange-700">Informações íntimas em risco</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">Spam e Golpes</p>
                <p className="text-sm text-blue-700">Número em listas criminosas</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Ver Solução de Proteção
        </button>
      </div>
    </div>
  );
};

// Página 10: Oferta Final Moderna
const Page10 = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 500);
  }, []);

  const securityComparison = [
    { name: "Situação Atual", value: 11, color: "#ef4444" },
    { name: "Com CyberShield", value: 97, color: "#22c55e" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto p-6 pt-8">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-light text-slate-900 mb-4">
            Proteção Disponível
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4">
            <p className="text-lg text-slate-700">
              <span className="text-red-600 font-bold bg-red-100 px-3 py-1 rounded-lg">
                89% de vulnerabilidade
              </span>
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <p className="text-lg text-slate-700">
              <span className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded-lg">
                Proteção profissional disponível
              </span>
            </p>
          </div>
        </div>

        {/* Comparação de Segurança Centralizada */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-200 shadow-sm">
          <h3 className="font-medium text-lg mb-6 text-center text-slate-900">
            Comparação de Proteção
          </h3>
          <div className="flex justify-center gap-8">
            {securityComparison.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <ProfessionalPieChart
                    data={[
                      {
                        name: item.name,
                        value: item.value,
                        color: item.color,
                      },
                    ]}
                    size={100}
                  />
                </div>
                <p
                  className="text-sm font-bold mb-1"
                  style={{ color: item.color }}
                >
                  {item.name}
                </p>
                <p className="text-xs text-slate-600">
                  {item.value}% protegido
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefícios da Proteção */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-200 shadow-sm">
          <h3 className="font-medium text-lg mb-4 text-center text-slate-900">
            CyberShield Pro - Proteção Completa
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-slate-700">
                Bloqueio de observação em locais públicos
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-slate-700">
                Criptografia avançada de dados íntimos
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-slate-700">
                Bloqueador inteligente de ligações spam
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-slate-700">
                Monitoramento 24/7 de vazamentos
              </span>
            </div>
          </div>
        </div>

        {/* Informações de Preço Modernas */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-6 text-center text-white shadow-lg">
          <h3 className="font-medium text-xl mb-3">
            Oferta Especial
          </h3>
          <div className="mb-4">
            <span className="text-green-200 text-lg">De </span>
            <span className="text-green-200 line-through text-xl">
              R$ 89,90
            </span>
            <span className="text-white text-lg"> por apenas</span>
          </div>
          <div className="text-4xl font-bold mb-2">
            R$ 16,90
          </div>
          <p className="text-green-100 mb-4">
            ou <span className="font-bold">3x de R$ 5,63</span> sem juros
          </p>
          <div className="bg-green-400 text-green-900 px-4 py-2 rounded-lg font-bold text-sm">
            💳 Parcela no cartão de crédito
          </div>
        </div>

        {/* Botão Principal */}
        <button
          onClick={() =>
            window.open(
              "https://pay.monetizze.com.br/DGD327992",
              "_blank",
            )
          }
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg mb-6 text-lg"
        >
          🛡️ Proteger Agora por R$ 16,90
        </button>

        {/* Garantias */}
        <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                Garantia de 7 dias
              </span>
            </div>
            <p className="text-sm text-blue-600">
              Não ficou satisfeito? Devolvemos seu dinheiro
            </p>
          </div>
        </div>

        {/* Badges de Confiança */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-200">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Pagamento Seguro</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">+1M Protegidos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// App Principal
export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userDDD, setUserDDD] = useState('');

  useExitPrevention();

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, 10));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1 onNext={nextPage} />;
      case 2:
        return <Page2 onNext={nextPage} />;
      case 3:
        return <Page3 onNext={nextPage} />;
      case 4:
        return <Page4 onNext={nextPage} setUserDDD={setUserDDD} />;
      case 5:
        return <Page5 onNext={nextPage} userDDD={userDDD} />;
      case 6:
        return <Page6 onNext={nextPage} />;
      case 7:
        return <Page7 onNext={nextPage} />;
      case 8:
        return <Page8 onNext={nextPage} />;
      case 9:
        return <Page9 onNext={nextPage} />;
      case 10:
        return <Page10 />;
      default:
        return <Page1 onNext={nextPage} />;
    }
  };

  return (
    <div className="relative">
      {renderPage()}

      {/* CSS para animações customizadas */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}