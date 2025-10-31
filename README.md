# 🎓 SEMIS v2.0

A **modern Student Electronic Management and Information System (SEMIS)** built with a full-stack architecture combining **ASP.NET Core 8.0** and **React + Tailwind CSS**.  
This system aims to streamline academic workflows such as student information management, clearance tracking, and administrative tasks — all in one sleek platform.

---

## 🚀 Features

- 🔐 **User Authentication & Roles** (Admin, Faculty, Student)  
- 📚 **Student Information Management**  
- 🧾 **Electronic Clearance Processing**  
- 📊 **Data Visualization for Reports**  
- 🌐 **RESTful API Integration (ASP.NET ↔ React)**  
- 💾 **SQL Server Database with EF Core Migrations**  
- 💡 **Modern UI with Tailwind CSS + React + Vite**

---

## 🧠 Tech Stack

### Backend
- **Language:** C#  
- **Framework:** ASP.NET Core 8.0  
- **Database:** SQL Server  
- **ORM:** Entity Framework Core  
- **Architecture:** Clean Architecture + Repository Pattern  
- **Migrations:** EF Core Migrations  
- **Hot Reload:** `dotnet watch run`

### Frontend
- **Framework:** React (TypeScript)  
- **Build Tool:** Vite  
- **Styling:** Tailwind CSS  
- **UI:** Sleek and responsive interface  
- **Development Server:** `npm run dev`

### Integration
- **API Type:** RESTful (JSON-based)  
- **CORS:** Enabled for cross-origin communication  
- **Frontend URL:** `http://localhost:5173`  
- **Backend URL:** `https://localhost:5001`

### Database
- **Engine:** Microsoft SQL Server  
- **Schema Management:** Entity Framework Core

---

## ⚙️ Setup Instructions

### 🔧 Backend (ASP.NET)
1. Navigate to the backend folder:
   ```bash'```
   ```cd api```
2. Restore dependencies:
   ```bash'```
   ```dotnet restore```
3. Run the project:
   ```bash'```
   ```dotnet watch run```
4. Backend should start at `https://localhost:5001.`

---  

### 💻 Frontend (React + Vite)

1. Navigate to the frontend folder:
   ```bash'```
   ```cd frontend```
2. Install dependencies:
   ```bash'```
   ```npm install```
3. Run the development server:
   ```bash'```
   ```npm run dev```  
4. Open the app at `http://localhost:5173.`

---    

## 💻 Folder Structure

semis-v2.0/  
│  
├── api/                 # ASP.NET Core backend  
│   ├── Controllers/  
│   ├── Models/  
│   ├── Data/  
│   ├── Repositories/  
│   └── Program.cs  
│  
├── frontend/            # React + Tailwind frontend  
│   ├── src/  
│   ├── public/  
│   ├── package.json  
│   └── vite.config.ts  
│  
└── README.md  

---    

## 🧪 Development Notes

- The frontend is powered by Vite for instant HMR (Hot Module Reload).
- Tailwind CSS is configured via postcss.config.js in the root of /frontend.
- Backend and frontend communicate via REST APIs secured with proper CORS setup.
- Use .env files to store environment variables like API URLs.

---  
## 📦 Deployment

| Layer        | Recommended Platform       |  
| :----------- | :------------------------- |  
| **Frontend** | Vercel / Netlify           |  
| **Backend**  | Azure App Service / Render |  
| **Database** | Azure SQL                  |  

---  

## 🤝 Contributing

Pull requests are welcome!  
Please make sure to open an issue first to discuss major changes or feature requests.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## ✨ Acknowledgements

- [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)

---

> 💬 *“Frontend is working beautifully ✨ — now let’s build the rest.”*

