import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutGrid,
  Package,
  ShoppingBag,
  Truck,
  Users,
  Banknote,
  BarChart3,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Printer,
  RotateCcw,
  Trash2,
  Edit3,
  FileText,
  ChevronRight,
  DollarSign,
  TrendingUp,
  Layers,
  UserCheck,
  Calendar,
  Phone,
  Award,
  X,
  Check,
  Filter,
  Sparkles,
  Download,
  Upload,
  Gift,
  Calculator,
  ClipboardCheck,
  Briefcase,
  Clock,
  UserX,
  AlertCircle
} from 'lucide-react';

// ============================================================================
// DATOS INICIALES DE EJEMPLO (CONTEXTO MÉXICO - LEYENDA HATS)
// ============================================================================
const INITIAL_JOB_POSITIONS = [
  {
    id: 'POS-01',
    title: 'Maestro Hormador y Prensado',
    department: 'Producción / Taller',
    defaultPayType: 'Destajo / Pieza',
    defaultRate: 85,
    description: 'Hormado al vapor, prensado de copa y conformado de falda.'
  },
  {
    id: 'POS-02',
    title: 'Costurera / Tafileteado y Forros',
    department: 'Confección',
    defaultPayType: 'Sueldo Fijo Semanal',
    defaultRate: 2800,
    description: 'Colocación de tafilete, sudadera interior y forro satinado.'
  },
  {
    id: 'POS-03',
    title: 'Planchador y Acabado Final',
    department: 'Producción / Taller',
    defaultPayType: 'Destajo / Pieza',
    defaultRate: 65,
    description: 'Planchado de ala, cepillado de pelo y control de calidad.'
  },
  {
    id: 'POS-04',
    title: 'Adornadora (Toquillas y Ribetes)',
    department: 'Acabados',
    defaultPayType: 'Sueldo Fijo Semanal',
    defaultRate: 2500,
    description: 'Montaje de toquillas de cuero, plumas, hebillas y ribeteado.'
  },
  {
    id: 'POS-05',
    title: 'Cortador y Preparador de Campanas',
    department: 'Producción / Taller',
    defaultPayType: 'Sueldo Fijo Semanal',
    defaultRate: 2600,
    description: 'Recorte de ala a medida y preparación de campanas de lana/palma.'
  },
  {
    id: 'POS-06',
    title: 'Empacador y Control de Almacén',
    department: 'Almacén y Logística',
    defaultPayType: 'Sueldo Fijo Semanal',
    defaultRate: 2450,
    description: 'Etiquetado por talla, encajado individual y surtido de pedidos.'
  },
  {
    id: 'POS-07',
    title: 'Vendedor de Mostrador y Mayoreo',
    department: 'Ventas',
    defaultPayType: 'Sueldo Fijo Semanal',
    defaultRate: 3100,
    description: 'Atención a clientes, cotizaciones y seguimiento de pedidos.'
  },
  {
    id: 'POS-08',
    title: 'Supervisor de Producción',
    department: 'Administración / Taller',
    defaultPayType: 'Sueldo Fijo Semanal',
    defaultRate: 3800,
    description: 'Coordinación de líneas de hormado, tiempos y entrega.'
  }
];

const INITIAL_INVENTORY = [
  {
    id: 'PRD-001',
    sku: 'SOM-TEJ-1000',
    name: 'Tejano 1000X Falda 4"',
    category: 'Sombrero Terminado',
    material: 'Pelo de Conejo / Lana',
    size: '58',
    color: 'Negro',
    price: 2450,
    cost: 1150,
    stock: 24,
    minStock: 10
  },
  {
    id: 'PRD-002',
    sku: 'SOM-PAL-FINA',
    name: 'Sombrero Palma Fina Trenzada',
    category: 'Sombrero Terminado',
    material: 'Palma Natural',
    size: '57',
    color: 'Natural / Hueso',
    price: 890,
    cost: 380,
    stock: 42,
    minStock: 15
  },
  {
    id: 'PRD-003',
    sku: 'SOM-FED-LANA',
    name: 'Fedora Clásico Ala Corta',
    category: 'Sombrero Terminado',
    material: 'Lana Australiana',
    size: '56',
    color: 'Camello / Arena',
    price: 1180,
    cost: 520,
    stock: 8,
    minStock: 12
  },
  {
    id: 'PRD-004',
    sku: 'SOM-VAQ-CAP',
    name: 'Vaquero Caporal Horma Rodeo',
    category: 'Sombrero Terminado',
    material: 'Dubetina Premium',
    size: '59',
    color: 'Tabaco',
    price: 1350,
    cost: 610,
    stock: 19,
    minStock: 10
  },
  {
    id: 'PRD-005',
    sku: 'SOM-GAM-CHAR',
    name: 'Sombrero Gamuza Elegante',
    category: 'Sombrero Terminado',
    material: 'Piel / Gamuza',
    size: '58',
    color: 'Chocolate',
    price: 1690,
    cost: 790,
    stock: 6,
    minStock: 8
  },
  {
    id: 'INS-001',
    sku: 'MAT-CAM-LANA',
    name: 'Campana de Lana Virgen sin Hormar',
    category: 'Materia Prima',
    material: 'Lana 100%',
    size: 'Única',
    color: 'Crudo / Negro',
    price: 0,
    cost: 240,
    stock: 65,
    minStock: 30
  },
  {
    id: 'INS-002',
    sku: 'MAT-TOQ-CUERO',
    name: 'Toquilla de Cuero Cincelado con Hebilla',
    category: 'Materia Prima',
    material: 'Cuero Bovino',
    size: 'Estándar',
    color: 'Café / Negro',
    price: 0,
    cost: 85,
    stock: 18,
    minStock: 25
  },
  {
    id: 'INS-003',
    sku: 'MAT-TAF-SUD',
    name: 'Tafilete / Sudadera Interior Acolchada',
    category: 'Materia Prima',
    material: 'Piel Sintética / Algodón',
    size: 'Estándar',
    color: 'Negro',
    price: 0,
    cost: 32,
    stock: 110,
    minStock: 40
  },
  {
    id: 'INS-004',
    sku: 'MAT-CAJ-IND',
    name: 'Caja Individual Cartón Reforzado',
    category: 'Materia Prima',
    material: 'Cartón Corrugado',
    size: '42x38x18 cm',
    color: 'Kraft Impreso',
    price: 0,
    cost: 28,
    stock: 14,
    minStock: 30
  }
];

const INITIAL_SALES = [
  {
    id: 'SO-2026-001',
    date: '2026-11-18',
    customer: 'Boutique El Estribo (Guadalajara)',
    customerType: 'Mayorista',
    salesperson: 'Luis Ángel Torres',
    notes: 'Entrega urgente por paquetería asegurada.',
    status: 'Entregado / Pagado',
    stockDeducted: true,
    items: [
      { productId: 'PRD-001', name: 'Tejano 1000X Falda 4"', qty: 6, unitPrice: 2450 },
      { productId: 'PRD-004', name: 'Vaquero Caporal Horma Rodeo', qty: 4, unitPrice: 1350 }
    ]
  },
  {
    id: 'SO-2026-002',
    date: '2026-11-22',
    customer: 'Talabartería Los Altos',
    customerType: 'Mayorista',
    salesperson: 'Luis Ángel Torres',
    notes: 'Incluye cajas individuales reforzadas.',
    status: 'Pedido Confirmado',
    stockDeducted: true,
    items: [
      { productId: 'PRD-002', name: 'Sombrero Palma Fina Trenzada', qty: 12, unitPrice: 890 }
    ]
  },
  {
    id: 'SO-2026-003',
    date: '2026-11-25',
    customer: 'Carlos Mendoza (Cliente Mostrador)',
    customerType: 'Cliente Final',
    salesperson: 'Luis Ángel Torres',
    notes: 'Cotización válida por 7 días.',
    status: 'Cotización',
    stockDeducted: false,
    items: [
      { productId: 'PRD-003', name: 'Fedora Clásico Ala Corta', qty: 2, unitPrice: 1180 },
      { productId: 'PRD-005', name: 'Sombrero Gamuza Elegante', qty: 1, unitPrice: 1690 }
    ]
  }
];

const INITIAL_PURCHASES = [
  {
    id: 'PO-2026-001',
    date: '2026-11-15',
    supplier: 'Curtiduría del Bajío S.A.',
    notes: 'Lote de cuero cincelado primera calidad.',
    status: 'Recibido en Almacén',
    stockAdded: true,
    items: [
      { productId: 'INS-002', name: 'Toquilla de Cuero Cincelado con Hebilla', qty: 30, unitCost: 85 },
      { productId: 'INS-003', name: 'Tafilete / Sudadera Interior Acolchada', qty: 50, unitCost: 32 }
    ]
  },
  {
    id: 'PO-2026-002',
    date: '2026-11-24',
    supplier: 'Tejedores de Palma de San Francisco',
    notes: 'Entrega programada en bodega León.',
    status: 'Orden de Compra',
    stockAdded: false,
    items: [
      { productId: 'PRD-002', name: 'Sombrero Palma Fina Trenzada', qty: 25, unitCost: 380 },
      { productId: 'INS-004', name: 'Caja Individual Cartón Reforzado', qty: 40, unitCost: 28 }
    ]
  }
];

const INITIAL_EMPLOYEES = [
  {
    id: 'EMP-01',
    name: 'José Guadalupe Ramírez',
    role: 'Maestro Hormador y Prensado',
    department: 'Producción / Taller',
    payType: 'Destajo / Pieza',
    rate: 85, // MXN por sombrero hormado
    hireDate: '2022-03-14',
    phone: '477-312-8890',
    status: 'Activo'
  },
  {
    id: 'EMP-02',
    name: 'María Elena Vázquez',
    role: 'Costurera / Tafileteado y Forros',
    department: 'Confección',
    payType: 'Sueldo Fijo Semanal',
    rate: 2800, // MXN semanal
    hireDate: '2023-06-01',
    phone: '477-490-1123',
    status: 'Activo'
  },
  {
    id: 'EMP-03',
    name: 'Roberto Carlos Hernández',
    role: 'Planchador y Acabado Final',
    department: 'Producción / Taller',
    payType: 'Destajo / Pieza',
    rate: 65, // MXN por sombrero
    hireDate: '2023-09-18',
    phone: '477-615-4402',
    status: 'Activo'
  },
  {
    id: 'EMP-04',
    name: 'Fernanda Sofía Morales',
    role: 'Adornadora (Toquillas y Ribetes)',
    department: 'Acabados',
    payType: 'Sueldo Fijo Semanal',
    rate: 2500,
    hireDate: '2024-01-10',
    phone: '477-809-3321',
    status: 'Activo'
  },
  {
    id: 'EMP-05',
    name: 'Luis Ángel Torres',
    role: 'Vendedor de Mostrador y Mayoreo',
    department: 'Ventas',
    payType: 'Sueldo Fijo Semanal',
    rate: 3100,
    hireDate: '2024-05-20',
    phone: '477-234-9901',
    status: 'Activo'
  }
];

const INITIAL_ATTENDANCE = [
  // Semana actual (20 al 25 Nov 2026) con datos realistas
  { date: '2026-11-20', employeeId: 'EMP-01', status: 'Presente', checkIn: '08:00', note: '' },
  { date: '2026-11-20', employeeId: 'EMP-02', status: 'Presente', checkIn: '08:02', note: '' },
  { date: '2026-11-20', employeeId: 'EMP-03', status: 'Retardo', checkIn: '08:25', note: 'Tráfico' },
  { date: '2026-11-20', employeeId: 'EMP-04', status: 'Presente', checkIn: '07:58', note: '' },
  { date: '2026-11-20', employeeId: 'EMP-05', status: 'Presente', checkIn: '08:55', note: '' },

  { date: '2026-11-21', employeeId: 'EMP-01', status: 'Presente', checkIn: '07:59', note: '' },
  { date: '2026-11-21', employeeId: 'EMP-02', status: 'Presente', checkIn: '08:00', note: '' },
  { date: '2026-11-21', employeeId: 'EMP-03', status: 'Presente', checkIn: '08:05', note: '' },
  { date: '2026-11-21', employeeId: 'EMP-04', status: 'Falta', checkIn: '', note: 'Falta injustificada' },
  { date: '2026-11-21', employeeId: 'EMP-05', status: 'Presente', checkIn: '09:00', note: '' },

  { date: '2026-11-23', employeeId: 'EMP-01', status: 'Presente', checkIn: '08:00', note: '' },
  { date: '2026-11-23', employeeId: 'EMP-02', status: 'Presente', checkIn: '08:01', note: '' },
  { date: '2026-11-23', employeeId: 'EMP-03', status: 'Presente', checkIn: '08:00', note: '' },
  { date: '2026-11-23', employeeId: 'EMP-04', status: 'Presente', checkIn: '08:03', note: '' },
  { date: '2026-11-23', employeeId: 'EMP-05', status: 'Permiso / Incapacidad', checkIn: '', note: 'Cita médica IMSS' },

  { date: '2026-11-24', employeeId: 'EMP-01', status: 'Presente', checkIn: '07:55', note: '' },
  { date: '2026-11-24', employeeId: 'EMP-02', status: 'Presente', checkIn: '08:00', note: '' },
  { date: '2026-11-24', employeeId: 'EMP-03', status: 'Presente', checkIn: '08:02', note: '' },
  { date: '2026-11-24', employeeId: 'EMP-04', status: 'Presente', checkIn: '08:00', note: '' },
  { date: '2026-11-24', employeeId: 'EMP-05', status: 'Presente', checkIn: '08:58', note: '' },

  { date: '2026-11-25', employeeId: 'EMP-01', status: 'Presente', checkIn: '08:00', note: '' },
  { date: '2026-11-25', employeeId: 'EMP-02', status: 'Presente', checkIn: '08:00', note: '' },
  { date: '2026-11-25', employeeId: 'EMP-03', status: 'Presente', checkIn: '08:04', note: '' },
  { date: '2026-11-25', employeeId: 'EMP-04', status: 'Presente', checkIn: '07:59', note: '' },
  { date: '2026-11-25', employeeId: 'EMP-05', status: 'Presente', checkIn: '09:00', note: '' }
];

const INITIAL_PAYROLLS = [
  {
    id: 'NOM-2026-W47',
    period: 'Semana 47 (18 al 24 Nov 2026)',
    status: 'Pagada',
    entries: [
      { employeeId: 'EMP-01', unitsWorked: 42, bonus: 300, deductions: 0 },
      { employeeId: 'EMP-02', unitsWorked: 6, bonus: 250, deductions: 0 },
      { employeeId: 'EMP-03', unitsWorked: 48, bonus: 200, deductions: 150 },
      { employeeId: 'EMP-04', unitsWorked: 6, bonus: 250, deductions: 0 },
      { employeeId: 'EMP-05', unitsWorked: 6, bonus: 400, deductions: 0 }
    ]
  },
  {
    id: 'NOM-2026-W48',
    period: 'Semana 48 (25 Nov al 01 Dic 2026)',
    status: 'Borrador',
    entries: [
      { employeeId: 'EMP-01', unitsWorked: 38, bonus: 300, deductions: 0 },
      { employeeId: 'EMP-02', unitsWorked: 6, bonus: 250, deductions: 0 },
      { employeeId: 'EMP-03', unitsWorked: 40, bonus: 0, deductions: 0 },
      { employeeId: 'EMP-04', unitsWorked: 6, bonus: 250, deductions: 200 },
      { employeeId: 'EMP-05', unitsWorked: 6, bonus: 300, deductions: 0 }
    ]
  }
];

// Formateador de Moneda MXN
const formatMXN = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(amount || 0);
};

// ============================================================================
// COMPONENTE PRINCIPAL: SOMBREROS ERP
// ============================================================================
export default function App() {
  // Navegación entre vistas ('apps' = App Switcher principal estilo Odoo)
  const [activeApp, setActiveApp] = useState('apps');

  // Estados persistentes en localStorage
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('sombreros_erp_inventory_v1');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('sombreros_erp_sales_v1');
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem('sombreros_erp_purchases_v1');
    return saved ? JSON.parse(saved) : INITIAL_PURCHASES;
  });

  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('sombreros_erp_employees_v1');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [payrolls, setPayrolls] = useState(() => {
    const saved = localStorage.getItem('sombreros_erp_payrolls_v1');
    return saved ? JSON.parse(saved) : INITIAL_PAYROLLS;
  });

  const [jobPositions, setJobPositions] = useState(() => {
    const saved = localStorage.getItem('sombreros_erp_positions_v1');
    return saved ? JSON.parse(saved) : INITIAL_JOB_POSITIONS;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('sombreros_erp_attendance_v1');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  // Notificaciones Toast estilo Odoo
  const [toast, setToast] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const fileInputRef = React.useRef(null);

  const notify = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3800);
  };

  // Sincronización con localStorage
  useEffect(() => {
    localStorage.setItem('sombreros_erp_inventory_v1', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('sombreros_erp_sales_v1', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('sombreros_erp_purchases_v1', JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem('sombreros_erp_employees_v1', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('sombreros_erp_payrolls_v1', JSON.stringify(payrolls));
  }, [payrolls]);

  useEffect(() => {
    localStorage.setItem('sombreros_erp_positions_v1', JSON.stringify(jobPositions));
  }, [jobPositions]);

  useEffect(() => {
    localStorage.setItem('sombreros_erp_attendance_v1', JSON.stringify(attendance));
  }, [attendance]);

  // Restaurar datos de demostración
  const handleResetDemoData = () => {
    setInventory(INITIAL_INVENTORY);
    setSales(INITIAL_SALES);
    setPurchases(INITIAL_PURCHASES);
    setEmployees(INITIAL_EMPLOYEES);
    setPayrolls(INITIAL_PAYROLLS);
    setJobPositions(INITIAL_JOB_POSITIONS);
    setAttendance(INITIAL_ATTENDANCE);
    setShowResetConfirm(false);
    notify('Datos de ejemplo de Leyenda Hats restaurados.');
  };

  // Exportar respaldo completo en JSON (para mover entre PC y Celular)
  const handleExportBackup = () => {
    try {
      const backupPayload = {
        app: 'LEYENDA HATS ERP',
        exportedAt: new Date().toISOString(),
        data: {
          inventory,
          sales,
          purchases,
          employees,
          payrolls,
          jobPositions,
          attendance
        }
      };
      const blob = new Blob([JSON.stringify(backupPayload, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Respaldo_LeyendaHats_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      notify('Respaldo .json descargado correctamente.');
    } catch (err) {
      notify('Error al generar el archivo de respaldo.', 'error');
    }
  };

  // Importar respaldo JSON desde PC o Celular
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const imported = parsed.data || parsed;
        if (!imported.inventory || !imported.sales || !imported.employees) {
          notify('El archivo seleccionado no es un respaldo válido de Leyenda Hats.', 'error');
          return;
        }
        setInventory(imported.inventory);
        setSales(imported.sales);
        setPurchases(imported.purchases || []);
        setEmployees(imported.employees);
        setPayrolls(imported.payrolls || []);
        if (imported.jobPositions) setJobPositions(imported.jobPositions);
        if (imported.attendance) setAttendance(imported.attendance);
        notify('Respaldo importado y sincronizado en este dispositivo.');
      } catch (err) {
        notify('No se pudo leer el archivo JSON de respaldo.', 'error');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  // ==========================================================================
  // CÁLCULOS DE KPIs EN TIEMPO REAL
  // ==========================================================================
  const kpis = useMemo(() => {
    // Ventas confirmadas o pagadas (con IVA)
    const activeSales = sales.filter((s) => s.status !== 'Cotización');
    const monthlySalesTotal = activeSales.reduce((acc, order) => {
      const sub = order.items.reduce((sum, it) => sum + it.qty * it.unitPrice, 0);
      return acc + sub * 1.16;
    }, 0);

    // Compras pendientes por recibir
    const pendingPurchases = purchases.filter((p) => p.status !== 'Recibido en Almacén');
    const pendingPurchasesTotal = pendingPurchases.reduce((acc, po) => {
      const sub = po.items.reduce((sum, it) => sum + it.qty * it.unitCost, 0);
      return acc + sub * 1.16;
    }, 0);

    // Valor del inventario (valuado a costo)
    const finishedStockValue = inventory
      .filter((i) => i.category === 'Sombrero Terminado')
      .reduce((sum, i) => sum + i.stock * i.cost, 0);

    const rawStockValue = inventory
      .filter((i) => i.category === 'Materia Prima')
      .reduce((sum, i) => sum + i.stock * i.cost, 0);

    const lowStockCount = inventory.filter((i) => i.stock <= i.minStock).length;

    // Personal activo
    const activeEmployeesCount = employees.filter((e) => e.status === 'Activo').length;

    // Nómina semanal más reciente
    const latestPayroll = payrolls[payrolls.length - 1];
    const weeklyPayrollTotal = latestPayroll
      ? latestPayroll.entries.reduce((sum, entry) => {
          const emp = employees.find((e) => e.id === entry.employeeId);
          if (!emp) return sum;
          const basePay =
            emp.payType === 'Destajo / Pieza'
              ? emp.rate * entry.unitsWorked
              : (emp.rate / 6) * entry.unitsWorked;
          return sum + basePay + (entry.bonus || 0) - (entry.deductions || 0);
        }, 0)
      : 0;

    return {
      monthlySalesTotal,
      activeSalesCount: activeSales.length,
      pendingPurchasesTotal,
      pendingPurchasesCount: pendingPurchases.length,
      finishedStockValue,
      rawStockValue,
      totalInventoryValue: finishedStockValue + rawStockValue,
      lowStockCount,
      activeEmployeesCount,
      weeklyPayrollTotal
    };
  }, [inventory, sales, purchases, employees, payrolls]);

  // ==========================================================================
  // DEFINICIÓN DE APPS ESTILO ODOO
  // ==========================================================================
  const appsList = [
    {
      id: 'ventas',
      name: 'Ventas',
      subtitle: 'Cotizaciones y Pedidos',
      icon: ShoppingBag,
      color: 'from-[#017E84] to-[#00A09D]',
      badge: sales.filter((s) => s.status === 'Cotización').length || null
    },
    {
      id: 'inventario',
      name: 'Inventario',
      subtitle: 'Sombreros e Insumos',
      icon: Package,
      color: 'from-[#E46E78] to-[#D9534F]',
      badge: kpis.lowStockCount || null
    },
    {
      id: 'compras',
      name: 'Compras',
      subtitle: 'Proveedores y Almacén',
      icon: Truck,
      color: 'from-[#875A7B] to-[#714B67]',
      badge: kpis.pendingPurchasesCount || null
    },
    {
      id: 'personal',
      name: 'Personal',
      subtitle: 'Taller y Puestos',
      icon: Users,
      color: 'from-[#2C8397] to-[#1F6170]',
      badge: null
    },
    {
      id: 'asistencia',
      name: 'Asistencia',
      subtitle: 'Pase de Lista Diario',
      icon: ClipboardCheck,
      color: 'from-[#0284C7] to-[#0369A1]',
      badge: null
    },
    {
      id: 'nomina',
      name: 'Nómina',
      subtitle: 'Semanal y Aguinaldo',
      icon: Banknote,
      color: 'from-[#2E8B57] to-[#1E6B40]',
      badge: payrolls.filter((p) => p.status === 'Borrador').length || null
    },
    {
      id: 'dashboard',
      name: 'Reportes',
      subtitle: 'Tablero Ejecutivo',
      icon: BarChart3,
      color: 'from-[#D97706] to-[#B45309]',
      badge: null
    }
  ];

  const currentAppMeta = appsList.find((a) => a.id === activeApp);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529] font-sans flex flex-col">
      {/* =====================================================================
          BARRA SUPERIOR ESTILO ODOO ENTERPRISE (#714B67) - LEYENDA HATS
         ===================================================================== */}
      <header className="bg-[#714B67] text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
          {/* Izquierda: Botón App Switcher (9 puntos) + Marca + Breadcrumb */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <button
              onClick={() => setActiveApp('apps')}
              title="Menú Principal de Aplicaciones"
              className="p-2 rounded-md hover:bg-white/15 transition-colors flex items-center justify-center shrink-0 focus:outline-none"
            >
              <LayoutGrid className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={() => setActiveApp('apps')}
              className="flex items-center space-x-2 text-left group min-w-0"
            >
              <span className="font-bold tracking-tight text-sm sm:text-lg flex items-center gap-1.5 truncate">
                <span className="bg-white text-[#714B67] px-1.5 py-0.5 rounded text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shrink-0">
                  ERP
                </span>
                <span className="truncate font-extrabold tracking-wide">LEYENDA HATS</span>
              </span>
            </button>

            {activeApp !== 'apps' && currentAppMeta && (
              <div className="hidden md:flex items-center text-sm text-white/85 shrink-0">
                <ChevronRight className="w-4 h-4 mx-1 opacity-60" />
                <span className="font-semibold text-white bg-white/15 px-2.5 py-1 rounded">
                  {currentAppMeta.name}
                </span>
              </div>
            )}
          </div>

          {/* Derecha: Respaldo JSON (Exportar/Importar), Apps y Restaurar Demo */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleImportBackup}
              className="hidden"
            />

            <button
              onClick={handleExportBackup}
              title="Exportar Respaldo (.json) para PC o Celular"
              className="flex items-center gap-1 text-xs bg-white/15 hover:bg-white/25 text-white px-2.5 py-1.5 rounded font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Exportar Respaldo</span>
              <span className="lg:hidden">Respaldo</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Importar Respaldo (.json)"
              className="flex items-center gap-1 text-xs bg-white/15 hover:bg-white/25 text-white px-2.5 py-1.5 rounded font-medium transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Importar</span>
            </button>

            {activeApp !== 'apps' && (
              <button
                onClick={() => setActiveApp('apps')}
                className="text-xs bg-[#017E84] hover:bg-[#016368] px-2.5 sm:px-3 py-1.5 rounded font-semibold transition-colors"
              >
                Apps
              </button>
            )}

            <button
              onClick={() => setShowResetConfirm(true)}
              title="Restaurar datos iniciales de ejemplo"
              className="flex items-center gap-1 text-xs bg-black/20 hover:bg-black/30 text-white/90 px-2 py-1.5 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Demo</span>
            </button>
          </div>
        </div>

        {/* Sub-barra de navegación rápida entre módulos cuando estás dentro de uno */}
        {activeApp !== 'apps' && (
          <nav className="bg-white border-b border-gray-200 text-gray-700 overflow-x-auto">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center space-x-1 sm:space-x-2 h-11">
              {appsList.map((app) => {
                const Icon = app.icon;
                const isActive = activeApp === app.id;
                return (
                  <button
                    key={app.id}
                    onClick={() => setActiveApp(app.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#714B67]/10 text-[#714B67] font-semibold border border-[#714B67]/20'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{app.name}</span>
                    {app.badge ? (
                      <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#017E84] text-white">
                        {app.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* =====================================================================
          NOTIFICACIÓN FLOTANTE (TOAST)
         ===================================================================== */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium ${
              toast.type === 'error'
                ? 'bg-red-600 text-white border-red-700'
                : 'bg-[#017E84] text-white border-[#016368]'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL DE CONFIRMACIÓN PARA RESTAURAR DATOS
         ===================================================================== */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center gap-3 text-amber-600 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-gray-900">Restaurar datos de ejemplo</h3>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Esta acción reemplazará tus cambios actuales en inventario, ventas, compras, personal y nómina con los datos iniciales de demostración de la fábrica de sombreros.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleResetDemoData}
                className="px-4 py-2 text-sm font-medium text-white bg-[#714B67] hover:bg-[#5c3c53] rounded-lg"
              >
                Sí, restaurar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          CONTENIDO PRINCIPAL (APP SWITCHER O MÓDULO ACTIVO)
         ===================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6">
        {activeApp === 'apps' && (
          <AppSwitcherHome
            appsList={appsList}
            onSelectApp={setActiveApp}
            kpis={kpis}
            inventory={inventory}
            sales={sales}
          />
        )}

        {activeApp === 'inventario' && (
          <InventoryModule
            inventory={inventory}
            setInventory={setInventory}
            notify={notify}
          />
        )}

        {activeApp === 'ventas' && (
          <SalesModule
            sales={sales}
            setSales={setSales}
            inventory={inventory}
            setInventory={setInventory}
            notify={notify}
          />
        )}

        {activeApp === 'compras' && (
          <PurchasesModule
            purchases={purchases}
            setPurchases={setPurchases}
            inventory={inventory}
            setInventory={setInventory}
            notify={notify}
          />
        )}

        {activeApp === 'personal' && (
          <EmployeesModule
            employees={employees}
            setEmployees={setEmployees}
            jobPositions={jobPositions}
            setJobPositions={setJobPositions}
            notify={notify}
          />
        )}

        {activeApp === 'asistencia' && (
          <AttendanceModule
            attendance={attendance}
            setAttendance={setAttendance}
            employees={employees}
            notify={notify}
          />
        )}

        {activeApp === 'nomina' && (
          <PayrollModule
            payrolls={payrolls}
            setPayrolls={setPayrolls}
            employees={employees}
            attendance={attendance}
            notify={notify}
          />
        )}

        {activeApp === 'dashboard' && (
          <ExecutiveDashboard
            kpis={kpis}
            inventory={inventory}
            sales={sales}
            purchases={purchases}
            employees={employees}
            payrolls={payrolls}
            onNavigate={setActiveApp}
          />
        )}
      </main>

      {/* Footer discreto */}
      <footer className="bg-white border-t border-gray-200 py-3 px-4 text-center text-xs text-gray-500">
        LEYENDA HATS • ERP Fábrica & Comercializadora de Sombreros (MXN) • Datos guardados automáticamente en este dispositivo
      </footer>
    </div>
  );
}

// ============================================================================
// 1. PANTALLA PRINCIPAL: APP SWITCHER ESTILO ODOO + RESUMEN EJECUTIVO
// ============================================================================
function AppSwitcherHome({ appsList, onSelectApp, kpis, inventory, sales }) {
  const lowStockItems = inventory.filter((i) => i.stock <= i.minStock);

  return (
    <div className="space-y-8">
      {/* Encabezado de bienvenida */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#714B67]">
            ERP Fábrica & Comercializadora de Sombreros
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">
            LEYENDA HATS — Panel Central
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Selecciona un módulo para gestionar almacén, ventas, compras, personal, nómina y aguinaldos.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-[#714B67] bg-[#714B67]/10 px-3 py-2 rounded-lg self-start sm:self-auto">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Operación Conectada en Tiempo Real</span>
        </div>
      </div>

      {/* Grid de Aplicaciones estilo Odoo */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-1">
          Módulos Instalados
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
          {appsList.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => onSelectApp(app.id)}
                className="group relative bg-white hover:bg-gray-50/90 border border-gray-200/90 hover:border-[#714B67]/40 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none"
              >
                {app.badge ? (
                  <span className="absolute top-3 right-3 bg-[#017E84] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {app.badge}
                  </span>
                ) : null}

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform mb-3.5`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <span className="font-bold text-gray-800 text-base group-hover:text-[#714B67] transition-colors">
                  {app.name}
                </span>
                <span className="text-xs text-gray-500 mt-1">{app.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Indicadores Clave (KPIs) en tiempo real */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-1">
          Indicadores Clave del Negocio (Tiempo Real)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            onClick={() => onSelectApp('ventas')}
            className="cursor-pointer bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm hover:border-[#017E84]/50 transition-all"
          >
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
              <span>Ventas del Mes (c/IVA)</span>
              <TrendingUp className="w-4 h-4 text-[#017E84]" />
            </div>
            <div className="text-xl font-extrabold text-gray-900 mt-2">
              {formatMXN(kpis.monthlySalesTotal)}
            </div>
            <div className="text-xs text-[#017E84] font-medium mt-1">
              {kpis.activeSalesCount} pedidos confirmados
            </div>
          </div>

          <div
            onClick={() => onSelectApp('compras')}
            className="cursor-pointer bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm hover:border-[#714B67]/50 transition-all"
          >
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
              <span>Compras por Recibir</span>
              <Truck className="w-4 h-4 text-[#714B67]" />
            </div>
            <div className="text-xl font-extrabold text-gray-900 mt-2">
              {formatMXN(kpis.pendingPurchasesTotal)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {kpis.pendingPurchasesCount} órdenes en tránsito
            </div>
          </div>

          <div
            onClick={() => onSelectApp('inventario')}
            className="cursor-pointer bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm hover:border-amber-500/50 transition-all"
          >
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
              <span>Valor Inventario (Costo)</span>
              <Layers className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl font-extrabold text-gray-900 mt-2">
              {formatMXN(kpis.totalInventoryValue)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Terminado: {formatMXN(kpis.finishedStockValue)}
            </div>
          </div>

          <div
            onClick={() => onSelectApp('personal')}
            className="cursor-pointer bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm hover:border-cyan-600/50 transition-all"
          >
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
              <span>Personal Activo</span>
              <UserCheck className="w-4 h-4 text-cyan-700" />
            </div>
            <div className="text-xl font-extrabold text-gray-900 mt-2">
              {kpis.activeEmployeesCount} trabajadores
            </div>
            <div className="text-xs text-gray-500 mt-1">Taller, hormado y ventas</div>
          </div>

          <div
            onClick={() => onSelectApp('nomina')}
            className="cursor-pointer bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm hover:border-emerald-600/50 transition-all"
          >
            <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase">
              <span>Nómina Semanal Est.</span>
              <Banknote className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-extrabold text-gray-900 mt-2">
              {formatMXN(kpis.weeklyPayrollTotal)}
            </div>
            <div className="text-xs text-emerald-700 font-medium mt-1">
              Sueldo fijo + destajo
            </div>
          </div>
        </div>
      </div>

      {/* Alertas de Reabastecimiento y Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas de inventario bajo */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Alertas de Stock Mínimo ({lowStockItems.length})</span>
            </h3>
            <button
              onClick={() => onSelectApp('inventario')}
              className="text-xs font-semibold text-[#017E84] hover:underline"
            >
              Ir a Inventario →
            </button>
          </div>
          {lowStockItems.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">
              Todo el catálogo cuenta con existencias por encima del mínimo requerido.
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {lowStockItems.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-500">
                      {item.category} • Mínimo: {item.minStock} uds
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                    Quedan {item.stock} uds
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Últimos pedidos de venta */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#017E84]" />
              <span>Últimos Pedidos de Sombreros</span>
            </h3>
            <button
              onClick={() => onSelectApp('ventas')}
              className="text-xs font-semibold text-[#017E84] hover:underline"
            >
              Ver Ventas →
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {sales.slice(0, 4).map((sale) => {
              const total =
                sale.items.reduce((s, i) => s + i.qty * i.unitPrice, 0) * 1.16;
              return (
                <div key={sale.id} className="py-2.5 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold text-gray-800">
                      {sale.id} — {sale.customer}
                    </div>
                    <div className="text-xs text-gray-500">{sale.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{formatMXN(total)}</div>
                    <StatusBadge status={sale.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. MÓDULO DE INVENTARIO (SOMBREROS TERMINADOS Y MATERIA PRIMA - EDICIÓN TOTAL)
// ============================================================================
function InventoryModule({ inventory, setInventory, notify }) {
  const [activeTab, setActiveTab] = useState('Sombrero Terminado');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Formulario de producto/insumo (crear o editar)
  const [form, setForm] = useState({
    sku: '',
    name: '',
    category: 'Sombrero Terminado',
    material: 'Palma Natural',
    size: '58',
    color: 'Natural',
    price: 1200,
    cost: 550,
    stock: 10,
    minStock: 5
  });

  const filteredItems = inventory.filter((item) => {
    const matchesTab = activeTab === 'Todos' || item.category === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.material.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAdjustStock = (id, delta) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextStock = Math.max(0, item.stock + delta);
        return { ...item, stock: nextStock };
      })
    );
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      sku: '',
      name: '',
      category: activeTab === 'Materia Prima' ? 'Materia Prima' : 'Sombrero Terminado',
      material: activeTab === 'Materia Prima' ? 'Cuero / Textil' : 'Lana Australiana',
      size: activeTab === 'Materia Prima' ? 'Estándar' : '58',
      color: 'Negro',
      price: 1400,
      cost: 600,
      stock: 15,
      minStock: 8
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({
      sku: item.sku,
      name: item.name,
      category: item.category,
      material: item.material,
      size: item.size,
      color: item.color,
      price: item.price,
      cost: item.cost,
      stock: item.stock,
      minStock: item.minStock
    });
    setShowModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingItem) {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                ...form,
                sku: form.sku.trim() || item.sku,
                price: form.category === 'Sombrero Terminado' ? Number(form.price) : 0,
                cost: Number(form.cost),
                stock: Number(form.stock),
                minStock: Number(form.minStock)
              }
            : item
        )
      );
      notify(`Artículo "${form.name}" actualizado correctamente.`);
    } else {
      const newId =
        (form.category === 'Sombrero Terminado' ? 'PRD-' : 'INS-') +
        String(Date.now()).slice(-4);
      const newItem = {
        ...form,
        id: newId,
        sku: form.sku.trim() || newId,
        price: form.category === 'Sombrero Terminado' ? Number(form.price) : 0,
        cost: Number(form.cost),
        stock: Number(form.stock),
        minStock: Number(form.minStock)
      };
      setInventory([newItem, ...inventory]);
      notify(`Producto "${newItem.name}" agregado al inventario.`);
    }

    setShowModal(false);
    setEditingItem(null);
  };

  const confirmDeleteItem = () => {
    if (!deleteTarget) return;
    setInventory((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    notify(`"${deleteTarget.name}" eliminado del catálogo.`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      {/* Barra de Control Odoo */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Inventario de Sombrerería</h1>
          <p className="text-xs text-gray-500">
            Edita precios, costos, tallas y existencias de producto terminado o materia prima.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar modelo, SKU o material..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#714B67]"
            />
          </div>

          <button
            onClick={openCreateModal}
            className="bg-[#714B67] hover:bg-[#5c3c53] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Producto / Insumo</span>
          </button>
        </div>
      </div>

      {/* Pestañas de Categoría */}
      <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto">
        {['Sombrero Terminado', 'Materia Prima', 'Todos'].map((tab) => {
          const count =
            tab === 'Todos'
              ? inventory.length
              : inventory.filter((i) => i.category === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === tab
                  ? 'border-[#714B67] text-[#714B67]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <span>{tab === 'Sombrero Terminado' ? 'Sombreros Terminados' : tab}</span>
              <span className="bg-gray-200/80 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tabla de Inventario */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                <th className="py-3 px-4">SKU / Modelo</th>
                <th className="py-3 px-4">Material y Acabado</th>
                <th className="py-3 px-4">Talla</th>
                <th className="py-3 px-4">Color</th>
                <th className="py-3 px-4 text-right">Costo Prod.</th>
                <th className="py-3 px-4 text-right">Precio Venta</th>
                <th className="py-3 px-4 text-center">Existencia</th>
                <th className="py-3 px-4 text-center">Ajuste</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredItems.map((item) => {
                const isLow = item.stock <= item.minStock;
                return (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{item.sku}</span>
                        <span className="px-1.5 py-0.2 bg-gray-100 rounded text-[10px]">
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.material}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-medium text-xs">
                        {item.size}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.color}</td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {formatMXN(item.cost)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">
                      {item.category === 'Sombrero Terminado'
                        ? formatMXN(item.price)
                        : '— (Insumo)'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          isLow
                            ? 'bg-red-100 text-red-700'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isLow && <AlertTriangle className="w-3 h-3" />}
                        {item.stock} uds
                      </span>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        Mín: {item.minStock}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleAdjustStock(item.id, -1)}
                          className="w-7 h-7 rounded bg-gray-100 hover:bg-red-100 hover:text-red-700 font-bold text-gray-700 flex items-center justify-center transition-colors"
                          title="Restar 1 unidad"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleAdjustStock(item.id, 1)}
                          className="w-7 h-7 rounded bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 font-bold text-gray-700 flex items-center justify-center transition-colors"
                          title="Sumar 1 unidad"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(item)}
                          title="Editar producto, costos o precios"
                          className="p-1.5 rounded-lg bg-[#714B67]/10 text-[#714B67] hover:bg-[#714B67] hover:text-white transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          title="Eliminar del catálogo"
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Confirmar Eliminación */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-2">¿Eliminar artículo?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Se eliminará <strong>{deleteTarget.name}</strong> ({deleteTarget.sku}) del inventario.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-2 text-xs font-semibold bg-gray-100 text-gray-700 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteItem}
                className="px-3.5 py-2 text-xs font-semibold bg-red-600 text-white rounded-lg"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Agregar / Editar Producto o Insumo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingItem
                  ? `Editar: ${editingItem.name}`
                  : 'Registrar Nuevo Artículo en Inventario'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Categoría</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="Sombrero Terminado">Sombrero Terminado</option>
                    <option value="Materia Prima">Materia Prima / Insumo</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">SKU / Código</label>
                  <input
                    type="text"
                    placeholder="Ej. SOM-TEJ-500X"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Nombre del Sombrero o Insumo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sombrero Texano Fieltro Fino"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Material</label>
                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Talla / Medida</label>
                  <input
                    type="text"
                    placeholder="54, 56, 58, 60..."
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Color</label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Costo ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.cost}
                    onChange={(e) => setForm({ ...form, cost: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                {form.category === 'Sombrero Terminado' && (
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Precio Venta ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                )}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Stock Actual</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Stock Mínimo</label>
                  <input
                    type="number"
                    min="0"
                    value={form.minStock}
                    onChange={(e) => setForm({ ...form, minStock: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#714B67] hover:bg-[#5c3c53] text-white rounded-lg font-semibold"
                >
                  {editingItem ? 'Guardar Cambios' : 'Guardar en Inventario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3. MÓDULO DE VENTAS (CREAR, EDITAR PRECIOS/CANTIDADES/CLIENTES Y REMISIONES)
// ============================================================================
function SalesModule({ sales, setSales, inventory, setInventory, notify }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const hatsCatalog = inventory.filter((i) => i.category === 'Sombrero Terminado');

  // Estado para crear o editar venta
  const [customer, setCustomer] = useState('');
  const [customerType, setCustomerType] = useState('Mayorista');
  const [saleDate, setSaleDate] = useState(new Date().toISOString().slice(0, 10));
  const [salesperson, setSalesperson] = useState('Luis Ángel Torres');
  const [saleNotes, setSaleNotes] = useState('');
  const [orderLines, setOrderLines] = useState([
    { productId: hatsCatalog[0]?.id || '', qty: 1, unitPrice: hatsCatalog[0]?.price || 1000 }
  ]);

  const openCreateSaleModal = () => {
    setEditingOrder(null);
    setCustomer('');
    setCustomerType('Mayorista');
    setSaleDate(new Date().toISOString().slice(0, 10));
    setSalesperson('Luis Ángel Torres');
    setSaleNotes('');
    setOrderLines([
      { productId: hatsCatalog[0]?.id || '', qty: 1, unitPrice: hatsCatalog[0]?.price || 1000 }
    ]);
    setShowSaleModal(true);
  };

  const openEditSaleModal = (order) => {
    setEditingOrder(order);
    setCustomer(order.customer);
    setCustomerType(order.customerType || 'Mayorista');
    setSaleDate(order.date);
    setSalesperson(order.salesperson || 'Luis Ángel Torres');
    setSaleNotes(order.notes || '');
    setOrderLines(
      order.items.map((it) => ({
        productId: it.productId,
        qty: it.qty,
        unitPrice: it.unitPrice
      }))
    );
    setShowSaleModal(true);
  };

  // Cambiar estado del flujo Odoo y descontar stock automáticamente
  const handleAdvanceStatus = (order, nextStatus) => {
    let updatedInventory = [...inventory];
    let shouldDeduct = !order.stockDeducted && nextStatus !== 'Cotización';

    if (shouldDeduct) {
      for (const line of order.items) {
        const prod = updatedInventory.find((p) => p.id === line.productId);
        if (!prod || prod.stock < line.qty) {
          notify(
            `Stock insuficiente de "${line.name}". Disponible: ${prod ? prod.stock : 0} uds.`,
            'error'
          );
          return;
        }
      }

      updatedInventory = updatedInventory.map((prod) => {
        const line = order.items.find((l) => l.productId === prod.id);
        if (!line) return prod;
        return { ...prod, stock: prod.stock - line.qty };
      });
      setInventory(updatedInventory);
    }

    const updatedOrders = sales.map((s) =>
      s.id === order.id
        ? { ...s, status: nextStatus, stockDeducted: s.stockDeducted || shouldDeduct }
        : s
    );
    setSales(updatedOrders);
    if (selectedOrder && selectedOrder.id === order.id) {
      setSelectedOrder({
        ...order,
        status: nextStatus,
        stockDeducted: order.stockDeducted || shouldDeduct
      });
    }

    notify(
      shouldDeduct
        ? `Pedido ${order.id} actualizado a "${nextStatus}" y stock descontado automáticamente.`
        : `Pedido ${order.id} marcado como "${nextStatus}".`
    );
  };

  const handleSaveSale = (e) => {
    e.preventDefault();
    if (!customer.trim()) return;

    const validItems = orderLines
      .map((line) => {
        const prod = hatsCatalog.find((p) => p.id === line.productId);
        if (!prod || Number(line.qty) <= 0) return null;
        return {
          productId: prod.id,
          name: prod.name,
          qty: Number(line.qty),
          unitPrice: Number(line.unitPrice)
        };
      })
      .filter(Boolean);

    if (validItems.length === 0) {
      notify('Agrega al menos un sombrero válido al pedido.', 'error');
      return;
    }

    if (editingOrder) {
      // Si el pedido ya había descontado stock, ajustamos la diferencia de unidades
      if (editingOrder.stockDeducted) {
        let tempInv = [...inventory];
        // Devolver lo anterior y restar lo nuevo
        editingOrder.items.forEach((oldLine) => {
          tempInv = tempInv.map((p) =>
            p.id === oldLine.productId ? { ...p, stock: p.stock + oldLine.qty } : p
          );
        });
        for (const newLine of validItems) {
          const prod = tempInv.find((p) => p.id === newLine.productId);
          if (!prod || prod.stock < newLine.qty) {
            notify(`Stock insuficiente de "${newLine.name}" para el cambio.`, 'error');
            return;
          }
          tempInv = tempInv.map((p) =>
            p.id === newLine.productId ? { ...p, stock: p.stock - newLine.qty } : p
          );
        }
        setInventory(tempInv);
      }

      const updatedOrder = {
        ...editingOrder,
        customer: customer.trim(),
        customerType,
        date: saleDate,
        salesperson: salesperson.trim(),
        notes: saleNotes.trim(),
        items: validItems
      };

      setSales(sales.map((s) => (s.id === editingOrder.id ? updatedOrder : s)));
      if (selectedOrder && selectedOrder.id === editingOrder.id) {
        setSelectedOrder(updatedOrder);
      }
      notify(`Pedido ${editingOrder.id} actualizado correctamente.`);
    } else {
      const newOrder = {
        id: `SO-2026-${String(sales.length + 101)}`,
        date: saleDate,
        customer: customer.trim(),
        customerType,
        salesperson: salesperson.trim(),
        notes: saleNotes.trim(),
        status: 'Cotización',
        stockDeducted: false,
        items: validItems
      };

      setSales([newOrder, ...sales]);
      setSelectedOrder(newOrder);
      notify(`Cotización ${newOrder.id} creada correctamente.`);
    }

    setShowSaleModal(false);
    setEditingOrder(null);
  };

  const confirmDeleteSale = () => {
    if (!deleteTarget) return;
    // Si ya había descontado inventario, devolver unidades
    if (deleteTarget.stockDeducted) {
      let restoredInv = [...inventory];
      deleteTarget.items.forEach((line) => {
        restoredInv = restoredInv.map((p) =>
          p.id === line.productId ? { ...p, stock: p.stock + line.qty } : p
        );
      });
      setInventory(restoredInv);
    }
    setSales(sales.filter((s) => s.id !== deleteTarget.id));
    if (selectedOrder && selectedOrder.id === deleteTarget.id) {
      setSelectedOrder(null);
    }
    notify(`Venta ${deleteTarget.id} eliminada.`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Ventas y Cotizaciones</h1>
          <p className="text-xs text-gray-500">
            Crea, edita precios o cantidades y confirma pedidos con descuento automático de stock.
          </p>
        </div>

        <button
          onClick={openCreateSaleModal}
          className="bg-[#017E84] hover:bg-[#016368] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Cotización / Venta</span>
        </button>
      </div>

      {/* Vista Detalle estilo Formulario Odoo */}
      {selectedOrder && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {selectedOrder.status === 'Cotización' && (
                <button
                  onClick={() => handleAdvanceStatus(selectedOrder, 'Pedido Confirmado')}
                  className="bg-[#714B67] hover:bg-[#5c3c53] text-white px-3.5 py-1.5 rounded text-xs font-bold shadow-sm"
                >
                  Confirmar Pedido (Descontar Stock)
                </button>
              )}
              {selectedOrder.status === 'Pedido Confirmado' && (
                <button
                  onClick={() => handleAdvanceStatus(selectedOrder, 'Entregado / Pagado')}
                  className="bg-[#017E84] hover:bg-[#016368] text-white px-3.5 py-1.5 rounded text-xs font-bold shadow-sm"
                >
                  Marcar Entregado y Pagado
                </button>
              )}
              <button
                onClick={() => openEditSaleModal(selectedOrder)}
                className="bg-white border border-gray-300 hover:bg-gray-100 text-[#714B67] px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Pedido</span>
              </button>
              <button
                onClick={() => window.print()}
                className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Remisión</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-xs text-gray-500 hover:text-gray-800 px-2 py-1"
              >
                Cerrar
              </button>
            </div>

            <div className="flex items-center text-xs font-semibold overflow-x-auto">
              {['Cotización', 'Pedido Confirmado', 'Entregado / Pagado'].map((st, idx) => {
                const isCurrent = selectedOrder.status === st;
                return (
                  <div key={st} className="flex items-center shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        isCurrent
                          ? 'bg-[#714B67] text-white shadow-sm'
                          : 'bg-gray-200/70 text-gray-500'
                      }`}
                    >
                      {st}
                    </span>
                    {idx < 2 && <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between border-b pb-4 mb-4 gap-4">
              <div>
                <div className="text-xs font-extrabold uppercase text-[#714B67]">
                  LEYENDA HATS — Nota de Remisión / Pedido de Venta
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">{selectedOrder.id}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Cliente:</strong> {selectedOrder.customer} ({selectedOrder.customerType})
                </p>
                {selectedOrder.salesperson && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    <strong>Vendedor:</strong> {selectedOrder.salesperson}
                  </p>
                )}
                {selectedOrder.notes && (
                  <p className="text-xs text-gray-500 mt-0.5 italic">
                    Nota: {selectedOrder.notes}
                  </p>
                )}
              </div>
              <div className="sm:text-right text-sm text-gray-600">
                <div>
                  <strong>Fecha:</strong> {selectedOrder.date}
                </div>
                <div>
                  <strong>Inventario:</strong>{' '}
                  {selectedOrder.stockDeducted ? (
                    <span className="text-emerald-700 font-semibold">
                      ✓ Descontado de almacén
                    </span>
                  ) : (
                    <span className="text-amber-600 font-semibold">
                      Pendiente de confirmar
                    </span>
                  )}
                </div>
              </div>
            </div>

            <table className="w-full text-sm border-collapse mb-4">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
                  <th className="py-2 text-left">Modelo de Sombrero</th>
                  <th className="py-2 text-center">Cantidad</th>
                  <th className="py-2 text-right">Precio Unitario</th>
                  <th className="py-2 text-right">Importe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {selectedOrder.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-medium text-gray-800">{item.name}</td>
                    <td className="py-2.5 text-center">{item.qty} uds</td>
                    <td className="py-2.5 text-right">{formatMXN(item.unitPrice)}</td>
                    <td className="py-2.5 text-right font-semibold">
                      {formatMXN(item.qty * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {(() => {
              const subtotal = selectedOrder.items.reduce(
                (s, i) => s + i.qty * i.unitPrice,
                0
              );
              const iva = subtotal * 0.16;
              const total = subtotal + iva;
              return (
                <div className="flex justify-end">
                  <div className="w-full sm:w-64 space-y-1.5 text-sm bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>{formatMXN(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>IVA (16%):</span>
                      <span>{formatMXN(iva)}</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-gray-900 border-t pt-1.5">
                      <span>Total MXN:</span>
                      <span>{formatMXN(total)}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Listado de Pedidos */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                <th className="py-3 px-4">Folio</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Cliente / Canal</th>
                <th className="py-3 px-4">Artículos</th>
                <th className="py-3 px-4 text-right">Total (c/IVA)</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {sales.map((sale) => {
                const total =
                  sale.items.reduce((s, i) => s + i.qty * i.unitPrice, 0) * 1.16;
                return (
                  <tr
                    key={sale.id}
                    onClick={() => setSelectedOrder(sale)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-[#714B67]">{sale.id}</td>
                    <td className="py-3 px-4 text-gray-600">{sale.date}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">{sale.customer}</div>
                      <div className="text-xs text-gray-500">{sale.customerType}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {sale.items.reduce((s, i) => s + i.qty, 0)} sombreros
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900">
                      {formatMXN(total)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={sale.status} />
                    </td>
                    <td
                      className="py-3 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(sale)}
                          className="text-xs font-semibold text-[#017E84] hover:underline px-1.5"
                        >
                          Remisión
                        </button>
                        <button
                          onClick={() => openEditSaleModal(sale)}
                          title="Editar venta, precios o cantidades"
                          className="p-1.5 rounded-lg bg-[#714B67]/10 text-[#714B67] hover:bg-[#714B67] hover:text-white transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(sale)}
                          title="Eliminar venta"
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Confirmar Eliminación */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-2">¿Eliminar pedido {deleteTarget.id}?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Si ya había descontado inventario, las unidades se devolverán automáticamente al almacén.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-2 text-xs font-semibold bg-gray-100 text-gray-700 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteSale}
                className="px-3.5 py-2 text-xs font-semibold bg-red-600 text-white rounded-lg"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Crear / Editar Venta */}
      {showSaleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingOrder
                  ? `Editar Venta ${editingOrder.id}`
                  : 'Crear Cotización / Pedido de Venta'}
              </h3>
              <button
                onClick={() => setShowSaleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSale} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">
                    Cliente o Boutique *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sombrerería El Vaquero (Monterrey)"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Tipo Cliente</label>
                  <select
                    value={customerType}
                    onChange={(e) => setCustomerType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="Mayorista">Mayorista</option>
                    <option value="Boutique">Boutique</option>
                    <option value="Cliente Final">Cliente Final</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Vendedor</label>
                  <input
                    type="text"
                    value={salesperson}
                    onChange={(e) => setSalesperson(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-gray-700">
                    Sombreros Solicitados (Puedes ajustar cantidad y precio unitario)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setOrderLines([
                        ...orderLines,
                        {
                          productId: hatsCatalog[0]?.id || '',
                          qty: 1,
                          unitPrice: hatsCatalog[0]?.price || 1000
                        }
                      ])
                    }
                    className="text-xs font-bold text-[#017E84] hover:underline"
                  >
                    + Agregar línea
                  </button>
                </div>

                <div className="space-y-2">
                  {orderLines.map((line, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <select
                        value={line.productId}
                        onChange={(e) => {
                          const prod = hatsCatalog.find((h) => h.id === e.target.value);
                          const copy = [...orderLines];
                          copy[idx].productId = e.target.value;
                          if (prod) copy[idx].unitPrice = prod.price;
                          setOrderLines(copy);
                        }}
                        className="col-span-6 border border-gray-300 rounded-lg px-2 py-2 text-xs"
                      >
                        {hatsCatalog.map((hat) => (
                          <option key={hat.id} value={hat.id}>
                            {hat.name} (Stock: {hat.stock})
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        min="1"
                        title="Cantidad"
                        placeholder="Cant."
                        value={line.qty}
                        onChange={(e) => {
                          const copy = [...orderLines];
                          copy[idx].qty = e.target.value;
                          setOrderLines(copy);
                        }}
                        className="col-span-2 border border-gray-300 rounded-lg px-2 py-2 text-center"
                      />

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        title="Precio unitario de venta ($)"
                        placeholder="Precio $"
                        value={line.unitPrice}
                        onChange={(e) => {
                          const copy = [...orderLines];
                          copy[idx].unitPrice = e.target.value;
                          setOrderLines(copy);
                        }}
                        className="col-span-3 border border-gray-300 rounded-lg px-2 py-2 text-right"
                      />

                      {orderLines.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setOrderLines(orderLines.filter((_, i) => i !== idx))
                          }
                          className="col-span-1 text-red-500 hover:text-red-700 flex justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Notas / Condiciones de Entrega
                </label>
                <input
                  type="text"
                  placeholder="Ej. Pago contra entrega, envío por paquetería..."
                  value={saleNotes}
                  onChange={(e) => setSaleNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              {/* Resumen previo */}
              {(() => {
                const sub = orderLines.reduce(
                  (acc, l) => acc + Number(l.unitPrice || 0) * Number(l.qty || 0),
                  0
                );
                return (
                  <div className="bg-gray-50 p-3 rounded-lg text-right space-y-1">
                    <div className="text-xs text-gray-500">
                      Subtotal: {formatMXN(sub)} | IVA (16%): {formatMXN(sub * 0.16)}
                    </div>
                    <div className="text-base font-extrabold text-gray-900">
                      Total Estimado: {formatMXN(sub * 1.16)}
                    </div>
                  </div>
                );
              })()}

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowSaleModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#017E84] hover:bg-[#016368] text-white rounded-lg font-semibold"
                >
                  {editingOrder ? 'Guardar Cambios' : 'Guardar Cotización'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 4. MÓDULO DE COMPRAS (CREAR, EDITAR COSTOS/CANTIDADES Y ENTRADA A ALMACÉN)
// ============================================================================
function PurchasesModule({ purchases, setPurchases, inventory, setInventory, notify }) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [editingPO, setEditingPO] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [supplier, setSupplier] = useState('Curtiduría del Bajío S.A.');
  const [poDate, setPoDate] = useState(new Date().toISOString().slice(0, 10));
  const [poNotes, setPoNotes] = useState('');
  const [poLines, setPoLines] = useState([
    { productId: inventory[0]?.id || '', qty: 20, unitCost: inventory[0]?.cost || 100 }
  ]);

  const openCreatePOModal = () => {
    setEditingPO(null);
    setSupplier('Curtiduría del Bajío S.A.');
    setPoDate(new Date().toISOString().slice(0, 10));
    setPoNotes('');
    setPoLines([
      { productId: inventory[0]?.id || '', qty: 20, unitCost: inventory[0]?.cost || 100 }
    ]);
    setShowPurchaseModal(true);
  };

  const openEditPOModal = (po) => {
    setEditingPO(po);
    setSupplier(po.supplier);
    setPoDate(po.date);
    setPoNotes(po.notes || '');
    setPoLines(
      po.items.map((it) => ({
        productId: it.productId,
        qty: it.qty,
        unitCost: it.unitCost
      }))
    );
    setShowPurchaseModal(true);
  };

  const handleAdvancePurchase = (po, nextStatus) => {
    let shouldAddStock = !po.stockAdded && nextStatus === 'Recibido en Almacén';

    if (shouldAddStock) {
      const updatedInv = inventory.map((item) => {
        const line = po.items.find((l) => l.productId === item.id);
        if (!line) return item;
        return {
          ...item,
          stock: item.stock + line.qty,
          cost: line.unitCost
        };
      });
      setInventory(updatedInv);
    }

    setPurchases(
      purchases.map((p) =>
        p.id === po.id
          ? { ...p, status: nextStatus, stockAdded: p.stockAdded || shouldAddStock }
          : p
      )
    );

    notify(
      shouldAddStock
        ? `Orden ${po.id} recibida. Unidades sumadas automáticamente al inventario.`
        : `Orden ${po.id} confirmada con proveedor.`
    );
  };

  const handleSavePurchase = (e) => {
    e.preventDefault();
    if (!supplier.trim()) return;

    const validItems = poLines
      .map((line) => {
        const prod = inventory.find((p) => p.id === line.productId);
        if (!prod || Number(line.qty) <= 0) return null;
        return {
          productId: prod.id,
          name: prod.name,
          qty: Number(line.qty),
          unitCost: Number(line.unitCost)
        };
      })
      .filter(Boolean);

    if (validItems.length === 0) return;

    if (editingPO) {
      // Si ya se había recibido en almacén, ajustamos diferencia de stock y costo
      if (editingPO.stockAdded) {
        let tempInv = [...inventory];
        editingPO.items.forEach((oldLine) => {
          tempInv = tempInv.map((item) =>
            item.id === oldLine.productId
              ? { ...item, stock: Math.max(0, item.stock - oldLine.qty) }
              : item
          );
        });
        validItems.forEach((newLine) => {
          tempInv = tempInv.map((item) =>
            item.id === newLine.productId
              ? { ...item, stock: item.stock + newLine.qty, cost: newLine.unitCost }
              : item
          );
        });
        setInventory(tempInv);
      }

      setPurchases(
        purchases.map((p) =>
          p.id === editingPO.id
            ? {
                ...p,
                supplier: supplier.trim(),
                date: poDate,
                notes: poNotes.trim(),
                items: validItems
              }
            : p
        )
      );
      notify(`Orden de compra ${editingPO.id} actualizada.`);
    } else {
      const newPO = {
        id: `PO-2026-${String(purchases.length + 101)}`,
        date: poDate,
        supplier: supplier.trim(),
        notes: poNotes.trim(),
        status: 'Solicitud de Presupuesto',
        stockAdded: false,
        items: validItems
      };

      setPurchases([newPO, ...purchases]);
      notify(`Solicitud de compra ${newPO.id} registrada.`);
    }

    setShowPurchaseModal(false);
    setEditingPO(null);
  };

  const confirmDeletePurchase = () => {
    if (!deleteTarget) return;
    if (deleteTarget.stockAdded) {
      let tempInv = [...inventory];
      deleteTarget.items.forEach((line) => {
        tempInv = tempInv.map((item) =>
          item.id === line.productId
            ? { ...item, stock: Math.max(0, item.stock - line.qty) }
            : item
        );
      });
      setInventory(tempInv);
    }
    setPurchases(purchases.filter((p) => p.id !== deleteTarget.id));
    notify(`Orden ${deleteTarget.id} eliminada.`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Compras a Proveedores</h1>
          <p className="text-xs text-gray-500">
            Edita proveedores, costos de insumos y recibe mercancía con suma automática al stock.
          </p>
        </div>

        <button
          onClick={openCreatePOModal}
          className="bg-[#714B67] hover:bg-[#5c3c53] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Orden de Compra</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                <th className="py-3 px-4">Orden</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Proveedor</th>
                <th className="py-3 px-4">Detalle de Insumos / Productos</th>
                <th className="py-3 px-4 text-right">Total (c/IVA)</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {purchases.map((po) => {
                const total =
                  po.items.reduce((s, i) => s + i.qty * i.unitCost, 0) * 1.16;
                return (
                  <tr key={po.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-4 font-bold text-[#714B67]">{po.id}</td>
                    <td className="py-3 px-4 text-gray-600">{po.date}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">{po.supplier}</div>
                      {po.notes && (
                        <div className="text-[11px] text-gray-400 italic">{po.notes}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-600">
                      {po.items.map((it, idx) => (
                        <div key={idx}>
                          • {it.qty}x {it.name} ({formatMXN(it.unitCost)} c/u)
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900">
                      {formatMXN(total)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={po.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {po.status === 'Solicitud de Presupuesto' && (
                          <button
                            onClick={() => handleAdvancePurchase(po, 'Orden de Compra')}
                            className="bg-[#714B67] hover:bg-[#5c3c53] text-white px-2.5 py-1 rounded text-xs font-semibold"
                          >
                            Confirmar
                          </button>
                        )}
                        {po.status === 'Orden de Compra' && (
                          <button
                            onClick={() => handleAdvancePurchase(po, 'Recibido en Almacén')}
                            className="bg-[#017E84] hover:bg-[#016368] text-white px-2.5 py-1 rounded text-xs font-semibold"
                          >
                            Recibir (+Stock)
                          </button>
                        )}
                        <button
                          onClick={() => openEditPOModal(po)}
                          title="Editar orden de compra"
                          className="p-1.5 rounded-lg bg-[#714B67]/10 text-[#714B67] hover:bg-[#714B67] hover:text-white transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(po)}
                          title="Eliminar orden"
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Confirmar Eliminación */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-2">
              ¿Eliminar orden {deleteTarget.id}?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Se eliminará este registro de compra de tu historial.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-2 text-xs font-semibold bg-gray-100 text-gray-700 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeletePurchase}
                className="px-3.5 py-2 text-xs font-semibold bg-red-600 text-white rounded-lg"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Crear / Editar Orden de Compra */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingPO
                  ? `Editar Orden de Compra ${editingPO.id}`
                  : 'Nueva Solicitud de Compra a Proveedor'}
              </h3>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePurchase} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">
                    Proveedor *
                  </label>
                  <input
                    type="text"
                    required
                    list="suppliers-list"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <datalist id="suppliers-list">
                    <option value="Curtiduría del Bajío S.A." />
                    <option value="Tejedores de Palma de San Francisco" />
                    <option value="Textiles y Forros León" />
                    <option value="Fieltros y Campanas del Centro" />
                  </datalist>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={poDate}
                    onChange={(e) => setPoDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-gray-700">
                    Insumos o Sombreros a Comprar
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setPoLines([
                        ...poLines,
                        {
                          productId: inventory[0]?.id || '',
                          qty: 10,
                          unitCost: inventory[0]?.cost || 100
                        }
                      ])
                    }
                    className="text-xs font-bold text-[#714B67] hover:underline"
                  >
                    + Agregar partida
                  </button>
                </div>

                <div className="space-y-2">
                  {poLines.map((line, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <select
                        value={line.productId}
                        onChange={(e) => {
                          const prod = inventory.find((p) => p.id === e.target.value);
                          const copy = [...poLines];
                          copy[idx].productId = e.target.value;
                          if (prod) copy[idx].unitCost = prod.cost;
                          setPoLines(copy);
                        }}
                        className="col-span-6 border border-gray-300 rounded-lg px-2 py-2 text-xs"
                      >
                        {inventory.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        min="1"
                        placeholder="Cant."
                        value={line.qty}
                        onChange={(e) => {
                          const copy = [...poLines];
                          copy[idx].qty = e.target.value;
                          setPoLines(copy);
                        }}
                        className="col-span-2 border border-gray-300 rounded-lg px-2 py-2 text-center"
                      />

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Costo"
                        value={line.unitCost}
                        onChange={(e) => {
                          const copy = [...poLines];
                          copy[idx].unitCost = e.target.value;
                          setPoLines(copy);
                        }}
                        className="col-span-3 border border-gray-300 rounded-lg px-2 py-2 text-right"
                      />

                      {poLines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setPoLines(poLines.filter((_, i) => i !== idx))}
                          className="col-span-1 text-red-500 hover:text-red-700 flex justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Observaciones / Factura Proveedor
                </label>
                <input
                  type="text"
                  placeholder="Ej. Crédito 15 días, factura A-452..."
                  value={poNotes}
                  onChange={(e) => setPoNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowPurchaseModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#714B67] hover:bg-[#5c3c53] text-white rounded-lg font-semibold"
                >
                  {editingPO ? 'Guardar Cambios' : 'Crear Orden de Compra'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 5. MÓDULO DE PERSONAL + CATÁLOGO DE PUESTOS DE TRABAJO (EDITABLE)
// ============================================================================
function EmployeesModule({
  employees,
  setEmployees,
  jobPositions,
  setJobPositions,
  notify
}) {
  const [subTab, setSubTab] = useState('empleados'); // 'empleados' | 'puestos'
  const [showEmpModal, setShowEmpModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteEmpTarget, setDeleteEmpTarget] = useState(null);

  // Modal y edición de Puestos de Trabajo
  const [showPosModal, setShowPosModal] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [posForm, setPosForm] = useState({
    title: '',
    department: 'Producción / Taller',
    defaultPayType: 'Destajo / Pieza',
    defaultRate: 75,
    description: ''
  });

  const [form, setForm] = useState({
    name: '',
    role: jobPositions[0]?.title || 'Maestro Hormador y Prensado',
    department: jobPositions[0]?.department || 'Producción / Taller',
    payType: jobPositions[0]?.defaultPayType || 'Destajo / Pieza',
    rate: jobPositions[0]?.defaultRate || 85,
    hireDate: new Date().toISOString().slice(0, 10),
    phone: '',
    status: 'Activo'
  });

  const openCreateModal = () => {
    setEditingEmployee(null);
    const defaultPos = jobPositions[0];
    setForm({
      name: '',
      role: defaultPos?.title || 'Hormador / Prensado',
      department: defaultPos?.department || 'Producción / Taller',
      payType: defaultPos?.defaultPayType || 'Destajo / Pieza',
      rate: defaultPos?.defaultRate || 80,
      hireDate: new Date().toISOString().slice(0, 10),
      phone: '',
      status: 'Activo'
    });
    setShowEmpModal(true);
  };

  const openEditModal = (emp) => {
    setEditingEmployee(emp);
    setForm({
      name: emp.name,
      role: emp.role,
      department: emp.department || 'Producción / Taller',
      payType: emp.payType,
      rate: emp.rate,
      hireDate: emp.hireDate,
      phone: emp.phone || '',
      status: emp.status
    });
    setShowEmpModal(true);
  };

  // Al elegir un puesto del catálogo dinámico, auto-rellenar departamento y tarifa sugerida
  const handleSelectPositionForEmployee = (selectedTitle) => {
    const found = jobPositions.find((p) => p.title === selectedTitle);
    if (found) {
      setForm((prev) => ({
        ...prev,
        role: found.title,
        department: found.department,
        payType: found.defaultPayType,
        rate: found.defaultRate
      }));
    } else {
      setForm((prev) => ({ ...prev, role: selectedTitle }));
    }
  };

  const handleSaveEmployee = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id
            ? { ...emp, ...form, rate: Number(form.rate) }
            : emp
        )
      );
      notify(`Ficha de ${form.name} actualizada.`);
    } else {
      const newEmp = {
        ...form,
        id: `EMP-${String(employees.length + 1).padStart(2, '0')}`,
        rate: Number(form.rate)
      };
      setEmployees([...employees, newEmp]);
      notify(`Trabajador ${newEmp.name} dado de alta correctamente.`);
    }
    setShowEmpModal(false);
    setEditingEmployee(null);
  };

  const confirmDeleteEmployee = () => {
    if (!deleteEmpTarget) return;
    setEmployees(employees.filter((e) => e.id !== deleteEmpTarget.id));
    notify(`Empleado ${deleteEmpTarget.name} eliminado.`);
    setDeleteEmpTarget(null);
  };

  const toggleStatus = (id) => {
    setEmployees(
      employees.map((e) =>
        e.id === id ? { ...e, status: e.status === 'Activo' ? 'Inactivo' : 'Activo' } : e
      )
    );
  };

  // Funciones CRUD para Puestos de Trabajo
  const openCreatePosModal = () => {
    setEditingPosition(null);
    setPosForm({
      title: '',
      department: 'Producción / Taller',
      defaultPayType: 'Destajo / Pieza',
      defaultRate: 75,
      description: ''
    });
    setShowPosModal(true);
  };

  const openEditPosModal = (pos) => {
    setEditingPosition(pos);
    setPosForm({
      title: pos.title,
      department: pos.department,
      defaultPayType: pos.defaultPayType,
      defaultRate: pos.defaultRate,
      description: pos.description || ''
    });
    setShowPosModal(true);
  };

  const handleSavePosition = (e) => {
    e.preventDefault();
    if (!posForm.title.trim()) return;

    if (editingPosition) {
      setJobPositions(
        jobPositions.map((p) =>
          p.id === editingPosition.id
            ? { ...p, ...posForm, defaultRate: Number(posForm.defaultRate) }
            : p
        )
      );
      notify(`Puesto "${posForm.title}" actualizado.`);
    } else {
      const newPos = {
        ...posForm,
        id: `POS-${String(jobPositions.length + 1).padStart(2, '0')}`,
        defaultRate: Number(posForm.defaultRate)
      };
      setJobPositions([...jobPositions, newPos]);
      notify(`Puesto "${newPos.title}" agregado al catálogo.`);
    }
    setShowPosModal(false);
    setEditingPosition(null);
  };

  const handleDeletePosition = (pos) => {
    setJobPositions(jobPositions.filter((p) => p.id !== pos.id));
    notify(`Puesto "${pos.title}" eliminado.`);
  };

  return (
    <div className="space-y-5">
      {/* Barra superior con pestañas Personal vs Puestos de Trabajo */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Personal y Puestos de Trabajo — Leyenda Hats
          </h1>
          <p className="text-xs text-gray-500">
            Administra trabajadores y define los puestos de tu fábrica con sus tarifas base.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setSubTab('empleados')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                subTab === 'empleados'
                  ? 'bg-[#714B67] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Trabajadores ({employees.length})</span>
            </button>
            <button
              onClick={() => setSubTab('puestos')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                subTab === 'puestos'
                  ? 'bg-[#017E84] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Puestos de Trabajo ({jobPositions.length})</span>
            </button>
          </div>

          {subTab === 'empleados' ? (
            <button
              onClick={openCreateModal}
              className="bg-[#714B67] hover:bg-[#5c3c53] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Alta de Empleado</span>
            </button>
          ) : (
            <button
              onClick={openCreatePosModal}
              className="bg-[#017E84] hover:bg-[#016368] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Puesto</span>
            </button>
          )}
        </div>
      </div>

      {/* SUB-PESTAÑA 1: TARJETAS DE EMPLEADOS */}
      {subTab === 'empleados' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#714B67]/15 text-[#714B67] font-extrabold flex items-center justify-center text-base shrink-0">
                      {emp.name
                        .split(' ')
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base leading-tight">
                        {emp.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#017E84] mt-0.5">{emp.role}</p>
                      <p className="text-[11px] text-gray-400">
                        {emp.department || 'Producción / Taller'}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={emp.status} />
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Esquema de Pago:</span>
                    <span className="font-semibold text-gray-800">{emp.payType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Tarifa / Salario Base:</span>
                    <span className="font-bold text-gray-900">
                      {formatMXN(emp.rate)}{' '}
                      {emp.payType === 'Destajo / Pieza' ? '/ sombrero' : '/ semana'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> Teléfono:
                    </span>
                    <span>{emp.phone || 'No registrado'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Ingreso (Aguinaldo):
                    </span>
                    <span className="font-semibold text-gray-800">{emp.hireDate}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(emp)}
                    className="text-xs font-semibold text-[#714B67] hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => setDeleteEmpTarget(emp)}
                    className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar</span>
                  </button>
                </div>
                <button
                  onClick={() => toggleStatus(emp.id)}
                  className="text-xs font-semibold text-gray-500 hover:text-[#017E84]"
                >
                  {emp.status === 'Activo' ? 'Dar de baja' : 'Reactivar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-PESTAÑA 2: CATÁLOGO DE PUESTOS DE TRABAJO */}
      {subTab === 'puestos' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                  <th className="py-3 px-4">Puesto de Trabajo</th>
                  <th className="py-3 px-4">Departamento / Área</th>
                  <th className="py-3 px-4">Esquema Sugerido</th>
                  <th className="py-3 px-4 text-right">Tarifa / Sueldo Base</th>
                  <th className="py-3 px-4 text-center">Empleados</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobPositions.map((pos) => {
                  const assignedCount = employees.filter(
                    (e) => e.role === pos.title && e.status === 'Activo'
                  ).length;
                  return (
                    <tr key={pos.id} className="hover:bg-gray-50/80">
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">{pos.title}</div>
                        {pos.description && (
                          <div className="text-xs text-gray-500">{pos.description}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {pos.department}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{pos.defaultPayType}</td>
                      <td className="py-3 px-4 text-right font-bold text-gray-900">
                        {formatMXN(pos.defaultRate)}{' '}
                        <span className="text-xs font-normal text-gray-500">
                          {pos.defaultPayType === 'Destajo / Pieza' ? '/ pza' : '/ sem'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#714B67]/10 text-[#714B67]">
                          {assignedCount} activos
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openEditPosModal(pos)}
                            title="Editar puesto"
                            className="p-1.5 rounded-lg bg-[#714B67]/10 text-[#714B67] hover:bg-[#714B67] hover:text-white transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePosition(pos)}
                            title="Eliminar puesto"
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Confirmar Eliminación de Empleado */}
      {deleteEmpTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-2">
              ¿Eliminar a {deleteEmpTarget.name}?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Se eliminará su ficha del directorio de personal.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteEmpTarget(null)}
                className="px-3.5 py-2 text-xs font-semibold bg-gray-100 text-gray-700 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteEmployee}
                className="px-3.5 py-2 text-xs font-semibold bg-red-600 text-white rounded-lg"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Alta / Edición de Empleado */}
      {showEmpModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingEmployee ? 'Editar Ficha de Personal' : 'Alta de Personal'}
              </h3>
              <button
                onClick={() => setShowEmpModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEmployee} className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Pedro Antonio Salazar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Puesto de Trabajo
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => handleSelectPositionForEmployee(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    {jobPositions.map((pos) => (
                      <option key={pos.id} value={pos.title}>
                        {pos.title}
                      </option>
                    ))}
                    {!jobPositions.some((p) => p.title === form.role) && (
                      <option value={form.role}>{form.role}</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Departamento
                  </label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Tipo de Pago</label>
                  <select
                    value={form.payType}
                    onChange={(e) => setForm({ ...form, payType: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="Destajo / Pieza">Destajo / Pieza</option>
                    <option value="Sueldo Fijo Semanal">Sueldo Fijo Semanal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    {form.payType === 'Destajo / Pieza'
                      ? 'Tarifa x Pieza ($)'
                      : 'Sueldo Semanal ($)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={form.rate}
                    onChange={(e) => setForm({ ...form, rate: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="text"
                    placeholder="477-000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Fecha Ingreso (LFT) *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.hireDate}
                    onChange={(e) => setForm({ ...form, hireDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowEmpModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#714B67] hover:bg-[#5c3c53] text-white rounded-lg font-semibold"
                >
                  {editingEmployee ? 'Guardar Cambios' : 'Guardar Empleado'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Crear / Editar Puesto de Trabajo */}
      {showPosModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingPosition ? 'Editar Puesto de Trabajo' : 'Nuevo Puesto de Trabajo'}
              </h3>
              <button
                onClick={() => setShowPosModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePosition} className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Nombre del Puesto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Pintor y Acabado de Falda"
                  value={posForm.title}
                  onChange={(e) => setPosForm({ ...posForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Departamento / Área
                </label>
                <select
                  value={posForm.department}
                  onChange={(e) => setPosForm({ ...posForm, department: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="Producción / Taller">Producción / Taller</option>
                  <option value="Confección">Confección</option>
                  <option value="Acabados">Acabados</option>
                  <option value="Almacén y Logística">Almacén y Logística</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Administración / Taller">Administración / Taller</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Esquema Base
                  </label>
                  <select
                    value={posForm.defaultPayType}
                    onChange={(e) =>
                      setPosForm({ ...posForm, defaultPayType: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="Destajo / Pieza">Destajo / Pieza</option>
                    <option value="Sueldo Fijo Semanal">Sueldo Fijo Semanal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    {posForm.defaultPayType === 'Destajo / Pieza'
                      ? 'Tarifa Base ($)'
                      : 'Sueldo Semanal ($)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={posForm.defaultRate}
                    onChange={(e) =>
                      setPosForm({ ...posForm, defaultRate: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Funciones del Puesto
                </label>
                <input
                  type="text"
                  placeholder="Descripción breve de responsabilidades..."
                  value={posForm.description}
                  onChange={(e) =>
                    setPosForm({ ...posForm, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowPosModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#017E84] hover:bg-[#016368] text-white rounded-lg font-semibold"
                >
                  {editingPosition ? 'Guardar Cambios' : 'Guardar Puesto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 6. MÓDULO DE REGISTRO DE ASISTENCIA (PASE DE LISTA DIARIO + RESUMEN SEMANAL)
// ============================================================================
function AttendanceModule({ attendance, setAttendance, employees, notify }) {
  const [selectedDate, setSelectedDate] = useState('2026-11-25');
  const [viewMode, setViewMode] = useState('diario'); // 'diario' | 'resumen'

  const activeEmployees = employees.filter((e) => e.status === 'Activo');

  // Obtener registro de asistencia de un empleado en la fecha seleccionada
  const getRecordFor = (employeeId, dateStr) => {
    return (
      attendance.find((a) => a.date === dateStr && a.employeeId === employeeId) || {
        date: dateStr,
        employeeId,
        status: 'Sin Registrar',
        checkIn: '',
        note: ''
      }
    );
  };

  // Marcar o actualizar asistencia individual
  const handleSetStatus = (employeeId, status) => {
    const defaultTime =
      status === 'Presente' ? '08:00' : status === 'Retardo' ? '08:20' : '';

    setAttendance((prev) => {
      const exists = prev.some(
        (a) => a.date === selectedDate && a.employeeId === employeeId
      );
      if (exists) {
        return prev.map((a) =>
          a.date === selectedDate && a.employeeId === employeeId
            ? { ...a, status, checkIn: a.checkIn || defaultTime }
            : a
        );
      }
      return [
        ...prev,
        { date: selectedDate, employeeId, status, checkIn: defaultTime, note: '' }
      ];
    });
  };

  const handleUpdateField = (employeeId, field, value) => {
    setAttendance((prev) => {
      const exists = prev.some(
        (a) => a.date === selectedDate && a.employeeId === employeeId
      );
      if (exists) {
        return prev.map((a) =>
          a.date === selectedDate && a.employeeId === employeeId
            ? { ...a, [field]: value }
            : a
        );
      }
      return [
        ...prev,
        {
          date: selectedDate,
          employeeId,
          status: 'Presente',
          checkIn: field === 'checkIn' ? value : '08:00',
          note: field === 'note' ? value : ''
        }
      ];
    });
  };

  // Marcar a todos como Presente en la fecha seleccionada
  const handleMarkAllPresent = () => {
    setAttendance((prev) => {
      const filtered = prev.filter((a) => a.date !== selectedDate);
      const newRecords = activeEmployees.map((emp) => ({
        date: selectedDate,
        employeeId: emp.id,
        status: 'Presente',
        checkIn: '08:00',
        note: ''
      }));
      return [...filtered, ...newRecords];
    });
    notify(`Pase de lista completo: Todos marcados como "Presente" el ${selectedDate}.`);
  };

  // Contadores del día seleccionado
  const dailySummary = useMemo(() => {
    let presentes = 0;
    let retardos = 0;
    let faltas = 0;
    let permisos = 0;

    activeEmployees.forEach((emp) => {
      const rec = getRecordFor(emp.id, selectedDate);
      if (rec.status === 'Presente') presentes++;
      else if (rec.status === 'Retardo') retardos++;
      else if (rec.status === 'Falta') faltas++;
      else if (rec.status === 'Permiso / Incapacidad') permisos++;
    });

    return { presentes, retardos, faltas, permisos };
  }, [attendance, activeEmployees, selectedDate]);

  // Resumen acumulado por empleado (últimos 7 días desde selectedDate)
  const weeklyStatsByEmployee = useMemo(() => {
    const end = new Date(`${selectedDate}T23:59:59`);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);

    return activeEmployees.map((emp) => {
      const empRecords = attendance.filter((a) => {
        if (a.employeeId !== emp.id) return false;
        const d = new Date(`${a.date}T12:00:00`);
        return d >= start && d <= end;
      });

      const presentes = empRecords.filter((r) => r.status === 'Presente').length;
      const retardos = empRecords.filter((r) => r.status === 'Retardo').length;
      const faltas = empRecords.filter((r) => r.status === 'Falta').length;
      const permisos = empRecords.filter(
        (r) => r.status === 'Permiso / Incapacidad'
      ).length;

      return {
        emp,
        presentes,
        retardos,
        faltas,
        permisos,
        diasAsistidos: presentes + retardos
      };
    });
  }, [attendance, activeEmployees, selectedDate]);

  return (
    <div className="space-y-5">
      {/* Encabezado y controles */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Registro de Asistencia — Leyenda Hats
          </h1>
          <p className="text-xs text-gray-500">
            Pase de lista diario conectado automáticamente con la Nómina Semanal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('diario')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                viewMode === 'diario'
                  ? 'bg-[#714B67] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pase de Lista Diario
            </button>
            <button
              onClick={() => setViewMode('resumen')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                viewMode === 'resumen'
                  ? 'bg-[#017E84] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Resumen Semanal (7 días)
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5">
            <Calendar className="w-4 h-4 text-[#714B67]" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs sm:text-sm font-bold text-gray-800 bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Tarjetas de resumen rápido del día */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
          <div className="text-xs font-bold text-emerald-700 uppercase">Presentes</div>
          <div className="text-2xl font-extrabold text-emerald-800 mt-1">
            {dailySummary.presentes}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-sm">
          <div className="text-xs font-bold text-amber-700 uppercase">Retardos</div>
          <div className="text-2xl font-extrabold text-amber-800 mt-1">
            {dailySummary.retardos}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-red-200 shadow-sm">
          <div className="text-xs font-bold text-red-700 uppercase">Faltas</div>
          <div className="text-2xl font-extrabold text-red-700 mt-1">
            {dailySummary.faltas}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-sky-200 shadow-sm">
          <div className="text-xs font-bold text-sky-700 uppercase">Permisos / Incap.</div>
          <div className="text-2xl font-extrabold text-sky-800 mt-1">
            {dailySummary.permisos}
          </div>
        </div>
      </div>

      {/* VISTA 1: PASE DE LISTA DIARIO */}
      {viewMode === 'diario' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-gray-700">
              Lista de Asistencia del día: <span className="text-[#714B67]">{selectedDate}</span>
            </span>
            <button
              onClick={handleMarkAllPresent}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Marcar Todos Presentes</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                  <th className="py-3 px-4">Trabajador / Puesto</th>
                  <th className="py-3 px-4">Estado de Asistencia</th>
                  <th className="py-3 px-4 text-center">Hora Entrada</th>
                  <th className="py-3 px-4">Observación / Motivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeEmployees.map((emp) => {
                  const rec = getRecordFor(emp.id, selectedDate);
                  return (
                    <tr key={emp.id} className="hover:bg-gray-50/70">
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">{emp.name}</div>
                        <div className="text-xs text-gray-500">{emp.role}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            {
                              label: 'Presente',
                              active: 'bg-emerald-600 text-white border-emerald-700',
                              idle: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            },
                            {
                              label: 'Retardo',
                              active: 'bg-amber-500 text-white border-amber-600',
                              idle: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            },
                            {
                              label: 'Falta',
                              active: 'bg-red-600 text-white border-red-700',
                              idle: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                            },
                            {
                              label: 'Permiso / Incapacidad',
                              active: 'bg-sky-600 text-white border-sky-700',
                              idle: 'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100'
                            }
                          ].map((opt) => {
                            const isSelected = rec.status === opt.label;
                            return (
                              <button
                                key={opt.label}
                                type="button"
                                onClick={() => handleSetStatus(emp.id, opt.label)}
                                className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                                  isSelected ? opt.active + ' shadow-sm' : opt.idle
                                }`}
                              >
                                {opt.label === 'Permiso / Incapacidad' ? 'Permiso' : opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="time"
                          value={rec.checkIn || ''}
                          onChange={(e) =>
                            handleUpdateField(emp.id, 'checkIn', e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-xs font-medium"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          placeholder="Nota opcional..."
                          value={rec.note || ''}
                          onChange={(e) =>
                            handleUpdateField(emp.id, 'note', e.target.value)
                          }
                          className="w-full min-w-[140px] border border-gray-300 rounded px-2.5 py-1 text-xs"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VISTA 2: RESUMEN SEMANAL (ÚLTIMOS 7 DÍAS) */}
      {viewMode === 'resumen' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 text-xs font-bold text-gray-700">
            Acumulado de Asistencia de los últimos 7 días cerrando el {selectedDate}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                  <th className="py-3 px-4">Empleado / Puesto</th>
                  <th className="py-3 px-4 text-center text-emerald-700">Presentes</th>
                  <th className="py-3 px-4 text-center text-amber-700">Retardos</th>
                  <th className="py-3 px-4 text-center text-red-700">Faltas</th>
                  <th className="py-3 px-4 text-center text-sky-700">Permisos</th>
                  <th className="py-3 px-4 text-center">Total Días Asistidos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {weeklyStatsByEmployee.map((st) => (
                  <tr key={st.emp.id} className="hover:bg-gray-50/70">
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{st.emp.name}</div>
                      <div className="text-xs text-gray-500">{st.emp.role}</div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-emerald-700">
                      {st.presentes}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-amber-700">
                      {st.retardos}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-red-600">
                      {st.faltas}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-sky-700">
                      {st.permisos}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#714B67]/10 text-[#714B67]">
                        {st.diasAsistidos} días
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 7. MÓDULO DE NÓMINA SEMANAL (CONECTADO CON ASISTENCIA) + AGUINALDO (LFT)
// ============================================================================
function PayrollModule({ payrolls, setPayrolls, employees, attendance, notify }) {
  // Pestaña activa dentro de Nómina: 'semanal' | 'aguinaldo'
  const [payrollTab, setPayrollTab] = useState('semanal');

  const [selectedPayrollId, setSelectedPayrollId] = useState(
    payrolls[payrolls.length - 1]?.id || ''
  );
  const [receiptModal, setReceiptModal] = useState(null);

  // Estados específicos para Cálculo de Aguinaldo (LFT México)
  const [aguinaldoYear, setAguinaldoYear] = useState(2026);
  const [aguinaldoOverrides, setAguinaldoOverrides] = useState({});
  const [aguinaldoReceiptModal, setAguinaldoReceiptModal] = useState(null);

  const currentPayroll =
    payrolls.find((p) => p.id === selectedPayrollId) || payrolls[payrolls.length - 1];

  // Crear nueva semana de nómina con los empleados activos actuales
  const handleCreateNewWeek = () => {
    const weekNum = 48 + payrolls.length;
    const newId = `NOM-2026-W${weekNum}`;
    const activeEmps = employees.filter((e) => e.status === 'Activo');

    const newPayroll = {
      id: newId,
      period: `Semana ${weekNum} (2026)`,
      status: 'Borrador',
      entries: activeEmps.map((emp) => ({
        employeeId: emp.id,
        unitsWorked: emp.payType === 'Destajo / Pieza' ? 35 : 6,
        bonus: 200,
        deductions: 0
      }))
    };

    setPayrolls([...payrolls, newPayroll]);
    setSelectedPayrollId(newId);
    notify(`Nómina ${newId} generada en borrador con ${activeEmps.length} empleados activos.`);
  };

  // Actualizar días, piezas producidas, bonos o deducciones
  const handleUpdateEntry = (employeeId, field, value) => {
    if (currentPayroll.status !== 'Borrador') return;
    setPayrolls(
      payrolls.map((p) => {
        if (p.id !== currentPayroll.id) return p;
        return {
          ...p,
          entries: p.entries.map((ent) =>
            ent.employeeId === employeeId
              ? { ...ent, [field]: Math.max(0, Number(value)) }
              : ent
          )
        };
      })
    );
  };

  // Avanzar estado de nómina: Borrador -> Validada -> Pagada
  const handleChangePayrollStatus = (nextStatus) => {
    setPayrolls(
      payrolls.map((p) =>
        p.id === currentPayroll.id ? { ...p, status: nextStatus } : p
      )
    );
    notify(`Nómina ${currentPayroll.id} marcada como "${nextStatus}".`);
  };

  // Sincronizar días asistidos y descuento por faltas desde el módulo de Asistencia
  const handleSyncAttendanceToPayroll = () => {
    if (!currentPayroll || currentPayroll.status !== 'Borrador') return;

    setPayrolls(
      payrolls.map((p) => {
        if (p.id !== currentPayroll.id) return p;
        return {
          ...p,
          entries: p.entries.map((ent) => {
            const emp = employees.find((e) => e.id === ent.employeeId);
            if (!emp) return ent;
            const empAtt = attendance.filter((a) => a.employeeId === emp.id);
            const faltasCount = empAtt.filter((a) => a.status === 'Falta').length;
            const attendedDays = Math.min(
              6,
              Math.max(
                0,
                empAtt.filter((a) => a.status === 'Presente' || a.status === 'Retardo')
                  .length
              )
            );

            if (emp.payType === 'Sueldo Fijo Semanal') {
              const dailyRate = emp.rate / 6;
              return {
                ...ent,
                unitsWorked: attendedDays > 0 ? attendedDays : ent.unitsWorked,
                deductions: Math.round(faltasCount * dailyRate)
              };
            }
            return ent;
          })
        };
      })
    );
    notify('Asistencias y faltas sincronizadas con la nómina semanal.');
  };

  // Cálculo detallado por renglón (incluyendo resumen de asistencia del empleado)
  const computedRows = useMemo(() => {
    if (!currentPayroll) return [];
    return currentPayroll.entries
      .map((entry) => {
        const emp = employees.find((e) => e.id === entry.employeeId);
        if (!emp) return null;
        const baseAmount =
          emp.payType === 'Destajo / Pieza'
            ? emp.rate * entry.unitsWorked
            : (emp.rate / 6) * entry.unitsWorked;
        const netPay = baseAmount + (entry.bonus || 0) - (entry.deductions || 0);

        const empAtt = attendance.filter((a) => a.employeeId === emp.id);
        const attPresent = empAtt.filter(
          (a) => a.status === 'Presente' || a.status === 'Retardo'
        ).length;
        const attFaltas = empAtt.filter((a) => a.status === 'Falta').length;

        return {
          ...entry,
          emp,
          baseAmount,
          netPay,
          attPresent,
          attFaltas
        };
      })
      .filter(Boolean);
  }, [currentPayroll, employees, attendance]);

  const totalDispersion = computedRows.reduce((sum, r) => sum + r.netPay, 0);

  // ==========================================================================
  // CÁLCULO DE AGUINALDO CONFORME A LA LEY FEDERAL DEL TRABAJO (ART. 87 LFT)
  // ==========================================================================
  const aguinaldoRows = useMemo(() => {
    const activeEmps = employees.filter((e) => e.status === 'Activo');
    const yearStart = new Date(`${aguinaldoYear}-01-01T00:00:00`);
    const yearEnd = new Date(`${aguinaldoYear}-12-31T23:59:59`);

    return activeEmps.map((emp) => {
      // 1. Calcular días trabajados en el año en curso automáticamente desde hireDate
      const hire = new Date(`${emp.hireDate}T00:00:00`);
      let defaultDaysWorked = 365;
      if (!isNaN(hire.getTime())) {
        if (hire > yearEnd) {
          defaultDaysWorked = 0;
        } else if (hire > yearStart) {
          const diffTime = yearEnd.getTime() - hire.getTime();
          defaultDaysWorked = Math.min(365, Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1));
        }
      }

      // 2. Calcular Salario Diario (Sueldo fijo semanal / 7, o promedio semanal destajo / 7)
      let defaultDailySalary = 0;
      let salaryBasisNote = '';
      if (emp.payType === 'Sueldo Fijo Semanal') {
        defaultDailySalary = emp.rate / 7;
        salaryBasisNote = `${formatMXN(emp.rate)} sem / 7 días`;
      } else {
        // Promedio de unidades trabajadas en las nóminas registradas
        let totalUnits = 0;
        let countPayrolls = 0;
        payrolls.forEach((p) => {
          const entry = p.entries.find((ent) => ent.employeeId === emp.id);
          if (entry && entry.unitsWorked > 0) {
            totalUnits += entry.unitsWorked;
            countPayrolls += 1;
          }
        });
        const avgWeeklyUnits = countPayrolls > 0 ? totalUnits / countPayrolls : 35;
        const avgWeeklyPay = avgWeeklyUnits * emp.rate;
        defaultDailySalary = avgWeeklyPay / 7;
        salaryBasisNote = `Prom. ${avgWeeklyUnits.toFixed(1)} pzas/sem × ${formatMXN(emp.rate)} / 7`;
      }

      const override = aguinaldoOverrides[emp.id] || {};
      const daysWorkedInYear =
        override.daysWorkedInYear !== undefined
          ? Number(override.daysWorkedInYear)
          : defaultDaysWorked;
      const dailySalary =
        override.dailySalary !== undefined
          ? Number(override.dailySalary)
          : Number(defaultDailySalary.toFixed(2));
      const aguinaldoDays =
        override.aguinaldoDays !== undefined ? Number(override.aguinaldoDays) : 15;

      // Fórmula LFT Art. 87: (Días trabajados en el año / 365) * Días de aguinaldo * Salario Diario
      const proportionalFactor = Math.min(365, Math.max(0, daysWorkedInYear)) / 365;
      const aguinaldoAmount = proportionalFactor * aguinaldoDays * dailySalary;

      return {
        emp,
        daysWorkedInYear,
        dailySalary,
        aguinaldoDays,
        proportionalFactor,
        aguinaldoAmount,
        salaryBasisNote
      };
    });
  }, [employees, payrolls, aguinaldoYear, aguinaldoOverrides]);

  const totalAguinaldoGeneral = aguinaldoRows.reduce((s, r) => s + r.aguinaldoAmount, 0);

  const handleUpdateAguinaldoField = (empId, field, value) => {
    setAguinaldoOverrides((prev) => ({
      ...prev,
      [empId]: {
        ...(prev[empId] || {}),
        [field]: Math.max(0, Number(value))
      }
    }));
  };

  return (
    <div className="space-y-5">
      {/* Barra superior con selector de sub-módulo (Nómina Semanal vs Aguinaldo LFT) */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Nómina y Prestaciones — Leyenda Hats
          </h1>
          <p className="text-xs text-gray-500">
            Dispersión semanal (fijo/destajo) y cálculo automático de Aguinaldo conforme a la LFT México.
          </p>
        </div>

        {/* Pestañas internas */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setPayrollTab('semanal')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                payrollTab === 'semanal'
                  ? 'bg-[#714B67] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Banknote className="w-4 h-4" />
              <span>Nómina Semanal</span>
            </button>
            <button
              onClick={() => setPayrollTab('aguinaldo')}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
                payrollTab === 'aguinaldo'
                  ? 'bg-[#017E84] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>Cálculo de Aguinaldo (LFT)</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          PESTAÑA 1: NÓMINA SEMANAL
         ===================================================================== */}
      {payrollTab === 'semanal' && (
        <>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs font-semibold text-gray-600">
              Selecciona el periodo semanal a consultar o dispersar:
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={currentPayroll?.id || ''}
                onChange={(e) => setSelectedPayrollId(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-50 max-w-full"
              >
                {payrolls.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id} — {p.period} ({p.status})
                  </option>
                ))}
              </select>

              <button
                onClick={handleCreateNewWeek}
                className="bg-[#017E84] hover:bg-[#016368] text-white px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Semana</span>
              </button>
            </div>
          </div>

          {/* Pipeline de estados y acciones de la nómina actual */}
          {currentPayroll && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {currentPayroll.status === 'Borrador' && (
                    <>
                      <button
                        onClick={() => handleChangePayrollStatus('Validada')}
                        className="bg-[#714B67] hover:bg-[#5c3c53] text-white px-4 py-1.5 rounded text-xs font-bold shadow-sm"
                      >
                        Validar Cálculo de Nómina
                      </button>
                      <button
                        onClick={handleSyncAttendanceToPayroll}
                        title="Traer días asistidos y faltas desde el registro de asistencia"
                        className="bg-white border border-[#017E84] text-[#017E84] hover:bg-[#017E84]/10 px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5"
                      >
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        <span>Sincronizar Asistencias / Faltas</span>
                      </button>
                    </>
                  )}
                  {currentPayroll.status === 'Validada' && (
                    <button
                      onClick={() => handleChangePayrollStatus('Pagada')}
                      className="bg-[#017E84] hover:bg-[#016368] text-white px-4 py-1.5 rounded text-xs font-bold shadow-sm"
                    >
                      Confirmar Dispersión / Pagada
                    </button>
                  )}
                  {currentPayroll.status === 'Pagada' && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Nómina dispersada y cerrada
                    </span>
                  )}
                </div>

                <div className="flex items-center text-xs font-semibold overflow-x-auto">
                  {['Borrador', 'Validada', 'Pagada'].map((st, idx) => (
                    <div key={st} className="flex items-center shrink-0">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          currentPayroll.status === st
                            ? 'bg-[#714B67] text-white'
                            : 'bg-gray-200/70 text-gray-500'
                        }`}
                      >
                        {st}
                      </span>
                      {idx < 2 && <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabla editable de nómina */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/60 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                      <th className="py-3 px-4">Empleado / Puesto</th>
                      <th className="py-3 px-4">Esquema / Tarifa</th>
                      <th className="py-3 px-4 text-center">Asistencia Reg.</th>
                      <th className="py-3 px-4 text-center">Días o Piezas</th>
                      <th className="py-3 px-4 text-right">Percepción Base</th>
                      <th className="py-3 px-4 text-right">Bono Prod. ($)</th>
                      <th className="py-3 px-4 text-right">Deducciones ($)</th>
                      <th className="py-3 px-4 text-right">Neto a Pagar</th>
                      <th className="py-3 px-4 text-center">Recibo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {computedRows.map((row) => {
                      const isEditable = currentPayroll.status === 'Borrador';
                      return (
                        <tr key={row.employeeId} className="hover:bg-gray-50/70">
                          <td className="py-3 px-4">
                            <div className="font-bold text-gray-900">{row.emp.name}</div>
                            <div className="text-xs text-gray-500">{row.emp.role}</div>
                          </td>
                          <td className="py-3 px-4 text-xs">
                            <span className="font-semibold text-gray-700">{row.emp.payType}</span>
                            <div className="text-gray-500">
                              {formatMXN(row.emp.rate)}{' '}
                              {empRateSuffix(row.emp.payType)}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center text-xs">
                            <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                              {row.attPresent} asist.
                            </span>
                            {row.attFaltas > 0 && (
                              <span className="ml-1 inline-block px-2 py-0.5 rounded bg-red-50 text-red-700 font-semibold">
                                {row.attFaltas} falta{row.attFaltas > 1 ? 's' : ''}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="inline-flex items-center gap-1">
                              <input
                                type="number"
                                min="0"
                                disabled={!isEditable}
                                value={row.unitsWorked}
                                onChange={(e) =>
                                  handleUpdateEntry(
                                    row.employeeId,
                                    'unitsWorked',
                                    e.target.value
                                  )
                                }
                                className="w-16 border border-gray-300 rounded px-2 py-1 text-center font-semibold disabled:bg-gray-100"
                              />
                              <span className="text-xs text-gray-500">
                                {row.emp.payType === 'Destajo / Pieza' ? 'pzas' : 'días'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right text-gray-700">
                            {formatMXN(row.baseAmount)}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <input
                              type="number"
                              min="0"
                              disabled={!isEditable}
                              value={row.bonus}
                              onChange={(e) =>
                                handleUpdateEntry(row.employeeId, 'bonus', e.target.value)
                              }
                              className="w-24 border border-gray-300 rounded px-2 py-1 text-right disabled:bg-gray-100"
                            />
                          </td>
                          <td className="py-3 px-4 text-right">
                            <input
                              type="number"
                              min="0"
                              disabled={!isEditable}
                              value={row.deductions}
                              onChange={(e) =>
                                handleUpdateEntry(row.employeeId, 'deductions', e.target.value)
                              }
                              className="w-24 border border-gray-300 rounded px-2 py-1 text-right text-red-600 disabled:bg-gray-100"
                            />
                          </td>
                          <td className="py-3 px-4 text-right font-extrabold text-gray-900">
                            {formatMXN(row.netPay)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => setReceiptModal(row)}
                              className="text-xs font-semibold text-[#714B67] hover:underline flex items-center justify-center gap-1 mx-auto"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Recibo</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 border-t-2 border-gray-200">
                      <td colSpan="7" className="py-3.5 px-4 text-right font-bold text-gray-700">
                        TOTAL DISPERSIÓN SEMANAL ({currentPayroll.period}):
                      </td>
                      <td className="py-3.5 px-4 text-right text-lg font-extrabold text-[#017E84]">
                        {formatMXN(totalDispersion)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* =====================================================================
          PESTAÑA 2: CÁLCULO DE AGUINALDO (LEY FEDERAL DEL TRABAJO - MÉXICO)
         ===================================================================== */}
      {payrollTab === 'aguinaldo' && (
        <div className="space-y-4">
          {/* Banner explicativo Art. 87 LFT + Selector de Año */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#017E84]/15 text-[#017E84] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Art. 87 Ley Federal del Trabajo (México)
                </span>
                <span className="text-xs text-gray-500">Fecha límite de pago: 20 de diciembre</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                Cálculo Anual y Proporcional de Aguinaldo — Leyenda Hats
              </h2>
              <p className="text-xs text-gray-600">
                Fórmula: <strong>(Días trabajados en el año ÷ 365) × Días de Aguinaldo (mín. 15) × Salario Diario</strong>.
                Para destajo se calcula el promedio diario semanal y puedes ajustarlo manualmente si lo deseas.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <label className="text-xs font-bold text-gray-700">Ejercicio Fiscal:</label>
              <select
                value={aguinaldoYear}
                onChange={(e) => {
                  setAguinaldoYear(Number(e.target.value));
                  setAguinaldoOverrides({});
                }}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm font-bold text-[#714B67] bg-white"
              >
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
              </select>
            </div>
          </div>

          {/* Tabla de Cálculo de Aguinaldo */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                    <th className="py-3 px-4">Trabajador / Fecha Ingreso</th>
                    <th className="py-3 px-4">Base Salarial</th>
                    <th className="py-3 px-4 text-right">Salario Diario ($)</th>
                    <th className="py-3 px-4 text-center">Días Trab. Año</th>
                    <th className="py-3 px-4 text-center">Días Aguinaldo</th>
                    <th className="py-3 px-4 text-right">Aguinaldo Bruto</th>
                    <th className="py-3 px-4 text-center">Comprobante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {aguinaldoRows.map((row) => (
                    <tr key={row.emp.id} className="hover:bg-gray-50/80">
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">{row.emp.name}</div>
                        <div className="text-xs text-gray-500">
                          {row.emp.role} • Ingreso: <strong>{row.emp.hireDate}</strong>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        <span className="font-semibold text-gray-800">{row.emp.payType}</span>
                        <div className="text-gray-500">{row.salaryBasisNote}</div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={row.dailySalary}
                          onChange={(e) =>
                            handleUpdateAguinaldoField(
                              row.emp.id,
                              'dailySalary',
                              e.target.value
                            )
                          }
                          className="w-24 border border-gray-300 rounded px-2 py-1 text-right font-semibold text-gray-800"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <input
                            type="number"
                            min="0"
                            max="365"
                            value={row.daysWorkedInYear}
                            onChange={(e) =>
                              handleUpdateAguinaldoField(
                                row.emp.id,
                                'daysWorkedInYear',
                                e.target.value
                              )
                            }
                            className="w-20 border border-gray-300 rounded px-2 py-1 text-center font-semibold"
                          />
                          <span className="text-[10px] text-gray-400 mt-0.5">
                            {(row.proportionalFactor * 100).toFixed(0)}% del año
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <input
                          type="number"
                          min="15"
                          max="90"
                          value={row.aguinaldoDays}
                          onChange={(e) =>
                            handleUpdateAguinaldoField(
                              row.emp.id,
                              'aguinaldoDays',
                              e.target.value
                            )
                          }
                          className="w-16 border border-gray-300 rounded px-2 py-1 text-center font-semibold text-[#714B67]"
                        />
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-emerald-700 text-base">
                        {formatMXN(row.aguinaldoAmount)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setAguinaldoReceiptModal(row)}
                          className="text-xs font-semibold text-[#017E84] hover:underline flex items-center justify-center gap-1 mx-auto"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Recibo</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 border-t-2 border-gray-200">
                    <td colSpan="5" className="py-3.5 px-4 text-right font-bold text-gray-700">
                      TOTAL GENERAL DE AGUINALDOS {aguinaldoYear} (LEYENDA HATS):
                    </td>
                    <td className="py-3.5 px-4 text-right text-lg font-extrabold text-[#017E84]">
                      {formatMXN(totalAguinaldoGeneral)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Recibo Individual de Nómina Semanal */}
      {receiptModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div>
                <div className="text-[11px] font-bold uppercase text-[#714B67]">
                  Comprobante de Pago Semanal
                </div>
                <h3 className="text-base font-extrabold text-gray-900">
                  LEYENDA HATS — Fábrica de Sombreros
                </h3>
              </div>
              <button
                onClick={() => setReceiptModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                <div>
                  <strong>Periodo:</strong> {currentPayroll.period}
                </div>
                <div>
                  <strong>Trabajador:</strong> {receiptModal.emp.name}
                </div>
                <div>
                  <strong>Puesto:</strong> {receiptModal.emp.role}
                </div>
                <div>
                  <strong>Esquema:</strong> {receiptModal.emp.payType} (
                  {receiptModal.unitsWorked}{' '}
                  {receiptModal.emp.payType === 'Destajo / Pieza'
                    ? 'sombreros producidos'
                    : 'días laborados'}
                  )
                </div>
              </div>

              <div className="border-t border-b py-2.5 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sueldo / Destajo Base:</span>
                  <span className="font-semibold">
                    {formatMXN(receiptModal.baseAmount)}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Bono Puntualidad / Producción:</span>
                  <span>+ {formatMXN(receiptModal.bonus)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Deducciones / Préstamos:</span>
                  <span>- {formatMXN(receiptModal.deductions)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-base font-extrabold text-gray-900 pt-1">
                <span>NETO RECIBIDO (MXN):</span>
                <span className="text-[#017E84]">{formatMXN(receiptModal.netPay)}</span>
              </div>

              <div className="pt-6 text-center text-[11px] text-gray-400">
                ____________________________________
                <div className="mt-1">Firma de Conformidad del Trabajador</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-[#714B67] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Recibo</span>
              </button>
              <button
                onClick={() => setReceiptModal(null)}
                className="px-3.5 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Recibo Individual de Aguinaldo (LFT) */}
      {aguinaldoReceiptModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div>
                <div className="text-[11px] font-bold uppercase text-[#017E84]">
                  Recibo de Aguinaldo Anual (Art. 87 LFT)
                </div>
                <h3 className="text-base font-extrabold text-gray-900">
                  LEYENDA HATS — Fábrica de Sombreros
                </h3>
              </div>
              <button
                onClick={() => setAguinaldoReceiptModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                <div>
                  <strong>Ejercicio Fiscal:</strong> Año {aguinaldoYear}
                </div>
                <div>
                  <strong>Trabajador:</strong> {aguinaldoReceiptModal.emp.name}
                </div>
                <div>
                  <strong>Puesto:</strong> {aguinaldoReceiptModal.emp.role}
                </div>
                <div>
                  <strong>Fecha de Ingreso:</strong> {aguinaldoReceiptModal.emp.hireDate}
                </div>
                <div>
                  <strong>Esquema:</strong> {aguinaldoReceiptModal.emp.payType}
                </div>
              </div>

              <div className="border-t border-b py-2.5 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Salario Diario Base:</span>
                  <span className="font-semibold">
                    {formatMXN(aguinaldoReceiptModal.dailySalary)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Días Laborados en {aguinaldoYear}:</span>
                  <span className="font-semibold">
                    {aguinaldoReceiptModal.daysWorkedInYear} / 365 días
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Días de Aguinaldo Otorgados:</span>
                  <span className="font-semibold">
                    {aguinaldoReceiptModal.aguinaldoDays} días
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-base font-extrabold text-gray-900 pt-1">
                <span>AGUINALDO BRUTO A PAGAR:</span>
                <span className="text-[#017E84]">
                  {formatMXN(aguinaldoReceiptModal.aguinaldoAmount)}
                </span>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed pt-1">
                Recibí de conformidad de <strong>LEYENDA HATS</strong> la cantidad señalada por concepto de Aguinaldo correspondiente al ejercicio {aguinaldoYear}, conforme al Artículo 87 de la Ley Federal del Trabajo.
              </p>

              <div className="pt-6 text-center text-[11px] text-gray-400">
                ____________________________________
                <div className="mt-1">Firma de Conformidad del Trabajador</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5 pt-3 border-t">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-[#017E84] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Recibo</span>
              </button>
              <button
                onClick={() => setAguinaldoReceiptModal(null)}
                className="px-3.5 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function empRateSuffix(payType) {
  return payType === 'Destajo / Pieza' ? '/ pza' : '/ sem';
}

// ============================================================================
// COMPONENTE AUXILIAR: ETIQUETA DE ESTADO (STATUS BADGE)
// ============================================================================
function StatusBadge({ status }) {
  const stylesMap = {
    'Cotización': 'bg-amber-100 text-amber-800 border-amber-200',
    'Solicitud de Presupuesto': 'bg-amber-100 text-amber-800 border-amber-200',
    'Borrador': 'bg-gray-100 text-gray-700 border-gray-200',
    'Pedido Confirmado': 'bg-purple-100 text-purple-800 border-purple-200',
    'Orden de Compra': 'bg-purple-100 text-purple-800 border-purple-200',
    'Validada': 'bg-purple-100 text-purple-800 border-purple-200',
    'Entregado / Pagado': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Recibido en Almacén': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Pagada': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Activo': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Inactivo': 'bg-red-100 text-red-700 border-red-200'
  };

  const badgeStyle =
    stylesMap[status] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeStyle}`}
    >
      {status}
    </span>
  );
}

// ============================================================================
// 7. MÓDULO DE REPORTES Y TABLERO EJECUTIVO
// ============================================================================
function ExecutiveDashboard({
  kpis,
  inventory,
  sales,
  purchases,
  employees,
  payrolls,
  onNavigate
}) {
  // Margen bruto estimado en sombreros terminados
  const hats = inventory.filter((i) => i.category === 'Sombrero Terminado');

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Tablero Ejecutivo y Rentabilidad por Modelo
          </h1>
          <p className="text-xs text-gray-500">
            Análisis financiero consolidado de ventas, costos de producción, almacén y nómina.
          </p>
        </div>
        <button
          onClick={() => onNavigate('apps')}
          className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg self-start sm:self-auto"
        >
          ← Volver a Aplicaciones
        </button>
      </div>

      {/* Tarjetas Resumen Financiero */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold uppercase text-gray-400">
            Ingresos Confirmados (c/IVA)
          </div>
          <div className="text-2xl font-extrabold text-[#017E84] mt-1">
            {formatMXN(kpis.monthlySalesTotal)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Basado en {kpis.activeSalesCount} pedidos activos
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold uppercase text-gray-400">
            Capital en Sombreros Terminados
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">
            {formatMXN(kpis.finishedStockValue)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Valuado a costo de taller</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold uppercase text-gray-400">
            Capital en Materia Prima
          </div>
          <div className="text-2xl font-extrabold text-[#714B67] mt-1">
            {formatMXN(kpis.rawStockValue)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Campanas, toquillas, tafiletes y cajas</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-xs font-bold uppercase text-gray-400">
            Gasto Nómina Última Semana
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">
            {formatMXN(kpis.weeklyPayrollTotal)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {kpis.activeEmployeesCount} trabajadores activos
          </p>
        </div>
      </div>

      {/* Tabla de Rentabilidad por Modelo de Sombrero */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">
            Análisis de Margen Unitario por Modelo de Sombrero
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500">
                <th className="py-3 px-4">Modelo</th>
                <th className="py-3 px-4">Material</th>
                <th className="py-3 px-4 text-right">Costo Taller</th>
                <th className="py-3 px-4 text-right">Precio Venta</th>
                <th className="py-3 px-4 text-right">Utilidad Bruta / Pza</th>
                <th className="py-3 px-4 text-right">Margen (%)</th>
                <th className="py-3 px-4 text-center">Stock Actual</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hats.map((h) => {
                const profit = h.price - h.cost;
                const margin = h.price > 0 ? ((profit / h.price) * 100).toFixed(1) : 0;
                return (
                  <tr key={h.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-900">{h.name}</td>
                    <td className="py-3 px-4 text-gray-600">{h.material}</td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {formatMXN(h.cost)}
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-gray-900">
                      {formatMXN(h.price)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-700">
                      {formatMXN(profit)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                        {margin}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold">{h.stock} uds</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}