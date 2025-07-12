
// Mock API service for frontend demo
// In production, these would be real API calls to your backend

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Events API
export const eventsApi = {
  async registerForEvent(eventId: number, userData: any): Promise<ApiResponse<any>> {
    await delay(1500);
    
    const registrations = JSON.parse(localStorage.getItem("eventRegistrations") || "[]");
    const newRegistration = {
      id: Date.now(),
      eventId,
      userId: userData.id,
      registeredAt: new Date().toISOString(),
      status: "confirmed"
    };
    registrations.push(newRegistration);
    localStorage.setItem("eventRegistrations", JSON.stringify(registrations));
    
    return {
      success: true,
      data: newRegistration,
      message: "Successfully registered for event"
    };
  },

  async getUserRegistrations(userId: string): Promise<ApiResponse<any[]>> {
    await delay(800);
    
    const registrations = JSON.parse(localStorage.getItem("eventRegistrations") || "[]");
    const userRegistrations = registrations.filter((reg: any) => reg.userId === userId);
    
    return {
      success: true,
      data: userRegistrations,
      message: "User registrations retrieved"
    };
  }
};

// Products API
export const productsApi = {
  async createProduct(productData: any): Promise<ApiResponse<any>> {
    await delay(2000);
    
    const products = JSON.parse(localStorage.getItem("userProducts") || "[]");
    const newProduct = {
      id: Date.now(),
      ...productData,
      createdAt: new Date().toISOString(),
      status: "active"
    };
    products.push(newProduct);
    localStorage.setItem("userProducts", JSON.stringify(products));
    
    return {
      success: true,
      data: newProduct,
      message: "Product created successfully"
    };
  },

  async getUserProducts(userId: string): Promise<ApiResponse<any[]>> {
    await delay(1000);
    
    const products = JSON.parse(localStorage.getItem("userProducts") || "[]");
    const userProducts = products.filter((product: any) => product.userId === userId);
    
    return {
      success: true,
      data: userProducts,
      message: "User products retrieved"
    };
  }
};

// Contact API
export const contactApi = {
  async submitContactForm(formData: any): Promise<ApiResponse<any>> {
    await delay(2000);
    
    const contacts = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
    const newContact = {
      id: Date.now(),
      ...formData,
      submittedAt: new Date().toISOString(),
      status: "new"
    };
    contacts.push(newContact);
    localStorage.setItem("contactSubmissions", JSON.stringify(contacts));
    
    return {
      success: true,
      data: newContact,
      message: "Contact form submitted successfully"
    };
  }
};

// Support API
export const supportApi = {
  async createTicket(ticketData: any): Promise<ApiResponse<any>> {
    await delay(1500);
    
    const tickets = JSON.parse(localStorage.getItem("supportTickets") || "[]");
    const newTicket = {
      id: `TICKET-${Date.now()}`,
      ...ticketData,
      createdAt: new Date().toISOString(),
      status: "open"
    };
    tickets.push(newTicket);
    localStorage.setItem("supportTickets", JSON.stringify(tickets));
    
    return {
      success: true,
      data: newTicket,
      message: "Support ticket created successfully"
    };
  },

  async getUserTickets(userId: string): Promise<ApiResponse<any[]>> {
    await delay(800);
    
    const tickets = JSON.parse(localStorage.getItem("supportTickets") || "[]");
    const userTickets = tickets.filter((ticket: any) => ticket.userId === userId);
    
    return {
      success: true,
      data: userTickets,
      message: "User tickets retrieved"
    };
  }
};

// Market Data API
export const marketApi = {
  async getMarketPrices(): Promise<ApiResponse<any[]>> {
    await delay(1000);
    
    // Mock market data with realistic fluctuations
    const baseData = [
      { name: "Wheat", basePrice: 2150, unit: "per quintal" },
      { name: "Rice (Basmati)", basePrice: 4800, unit: "per quintal" },
      { name: "Sugarcane", basePrice: 320, unit: "per quintal" },
      { name: "Cotton", basePrice: 5600, unit: "per quintal" },
      { name: "Corn", basePrice: 1850, unit: "per quintal" },
      { name: "Soybeans", basePrice: 4200, unit: "per quintal" }
    ];
    
    const marketData = baseData.map(item => {
      const fluctuation = (Math.random() - 0.5) * 0.1; // ±5% fluctuation
      const currentPrice = Math.round(item.basePrice * (1 + fluctuation));
      const change = ((currentPrice - item.basePrice) / item.basePrice * 100).toFixed(1);
      
      return {
        name: item.name,
        price: `₹${currentPrice.toLocaleString()}`,
        unit: item.unit,
        change: `${change > 0 ? '+' : ''}${change}%`,
        trend: change > 0 ? "up" : "down"
      };
    });
    
    return {
      success: true,
      data: marketData,
      message: "Market prices retrieved successfully"
    };
  }
};

// Analytics API
export const analyticsApi = {
  async getDashboardStats(userId: string): Promise<ApiResponse<any>> {
    await delay(1200);
    
    // Mock dashboard statistics
    const stats = {
      totalRevenue: "₹2,45,000",
      activeOrders: 156,
      totalCustomers: 2847,
      growthRate: "23.1%",
      monthlyGrowth: "+12.5%"
    };
    
    return {
      success: true,
      data: stats,
      message: "Dashboard statistics retrieved"
    };
  },

  async generateBusinessReport(userId: string, reportType: string): Promise<ApiResponse<any>> {
    await delay(3000);
    
    const report = {
      id: Date.now(),
      type: reportType,
      generatedAt: new Date().toISOString(),
      data: {
        summary: "Business performance analysis for the current quarter",
        revenue: "₹2,45,000",
        growth: "+23.1%",
        topProducts: ["Organic Wheat", "Basmati Rice", "Cotton"],
        recommendations: [
          "Expand organic wheat production by 25%",
          "Explore new markets for Basmati rice export",
          "Invest in cotton processing equipment"
        ]
      }
    };
    
    // Save report to localStorage
    const reports = JSON.parse(localStorage.getItem("businessReports") || "[]");
    reports.push(report);
    localStorage.setItem("businessReports", JSON.stringify(reports));
    
    return {
      success: true,
      data: report,
      message: "Business report generated successfully"
    };
  }
};
