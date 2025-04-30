
![Collab Draw Banner](https://fuchsia-legal-roundworm-794.mypinata.cloud/ipfs/bafybeicc2375kytalzb32octq454qdl2cbop7r2cchrmn6r27euupel4zq)

# Collab Draw


**Collab Draw** is an open-source collaborative drawing tool inspired by Excalidraw.  
It lets you **draw**, **collaborate in real-time**, and **build creative projects together** — right from your browser.

---

## 🚀 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/)
- **Backend:** [Express.js](https://expressjs.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)

---

## ✨ Features

- ✏️ Create and edit drawings easily
- 🤝 Real-time collaboration with others
- 🗂️ Save and load your drawings
- 🔒 Secure user authentication (coming soon!)
- 🌐 Fully open source and self-hostable

---

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/collab-draw.git
   cd collab-draw
   ```

2. **Install dependencies**
   ```bash
   # Install dependencies
   bun install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in /packages/db
   Example for the backend:

   ```bash
   DATABASE_URL=postgresql://your-username:your-password@localhost:5432/your-database
   ```

4. **Run the development servers**

   - Start the backend, run  the following command in the root folder 
     ```bash
     bun dev 
     ```

5. **Access the app**

   Open your browser and navigate to `http://localhost:3000`
   The WS server will run on port `http://localhost:8081`
   The API server will run on port `http://localhost:3001`

---


## 🌍 Contributing

We welcome contributions of all kinds!  
If you'd like to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---


## 🙌 Acknowledgements

- Inspired by the amazing [Excalidraw](https://excalidraw.com/)
- Built with ❤️ by [Me](https://x.com/Saksham37718116)

