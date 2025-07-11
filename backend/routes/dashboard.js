
const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    // Mock data - replace with real data from your database
    const stats = {
      totalRevenue: "₹2,45,000",
      activeOrders: 156,
      totalCustomers: 2847,
      growthRate: "23.1%"
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get market prices
router.get('/market-prices', auth, async (req, res) => {
  try {
    // Mock data - replace with real market data
    const marketPrices = [
      { crop: "Wheat", price: "₹2,100/quintal", change: "+5.2%" },
      { crop: "Rice", price: "₹1,850/quintal", change: "-2.1%" },
      { crop: "Cotton", price: "₹5,600/quintal", change: "+8.7%" },
      { crop: "Sugarcane", price: "₹320/quintal", change: "+1.5%" }
    ];

    res.json(marketPrices);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get weather data
router.get('/weather', auth, async (req, res) => {
  try {
    // Mock data - integrate with weather API
    const weather = {
      temperature: 28,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      forecast: [
        { day: "Tomorrow", high: 30, low: 22, condition: "Sunny" },
        { day: "Day 2", high: 32, low: 24, condition: "Cloudy" },
        { day: "Day 3", high: 29, low: 20, condition: "Rainy" }
      ]
    };

    res.json(weather);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recent activities
router.get('/activities', auth, async (req, res) => {
  try {
    // Mock data - replace with real user activities
    const activities = [
      {
        id: 1,
        type: "order",
        message: "New order received for Organic Wheat",
        time: "2 hours ago",
        status: "success"
      },
      {
        id: 2,
        type: "payment",
        message: "Payment of ₹15,000 processed",
        time: "4 hours ago",
        status: "success"
      },
      {
        id: 3,
        type: "alert",
        message: "Weather alert: Heavy rain expected",
        time: "6 hours ago",
        status: "warning"
      }
    ];

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
