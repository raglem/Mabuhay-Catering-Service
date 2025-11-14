# Mabuhay Restauraunt Web Catering Service

This is a web service designed to help a small business handle and manage their catering orders.
I built it as a full-stack application using **Spring Boot** and **React**. 
Customers can browse the menu and pay for orders via Stripe, and authenticated users (restauraunt staff) can edit the existing menu and view all orders. 

**Live Website:** https://mabuhay-kitchenette.com

Note: The current deployment is a React-only version of this project. The actual business preferred to handle orders through call and only desired to display the menu. Therefore, the current deployment is limited, even though the master branch's source code reflects all of the listed features.

(EC2 is also very expensive)

---

## Features

### **Frontend (React + TypeScript + Tailwind)**
- Clean, mobile-friendly menu pages  
- Checkout page with client-side Stripe payment integration
- Admin interface for managing menu items and viewing all customer orders 

### **Backend (Spring Boot + EC2 + RDS + S3)**
- REST APIs for menu operations
- Image uploads on S3 (for menu item uploads) 
- Persistent storage for menu and orders data via Amazon RDS
- EmailService Bean for sending order receipts and notifying restauraunt staff 

---

## Tech Stack

### **Frontend**
- React  
- TypeScript  
- Tailwind CSS  

### **Backend**
- Spring Boot  
- Spring Data JPA  
- Spring Web   
- PostgreSQL

### **Cloud (AWS Services)**
- EC2
- RDS
- S3

---


