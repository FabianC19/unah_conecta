# UNAH Conecta (Puma Conecta)

Proyecto estructurado bajo **Clean Architecture** (Arquitectura Limpia) con desacoplamiento total entre el cliente frontend y el servidor backend.

---

## 🛠️ Stack Tecnológico

* **Backend**: Node.js + Express.js + TypeScript + PostgreSQL (`pg` pool)
* **Frontend**: React + Vite + TypeScript + Tailwind CSS v4

---

## 🏛️ Clean Architecture - Estructura del Backend

El backend está diseñado en capas para desacoplar las reglas de negocio de los detalles de infraestructura (frameworks, bases de datos):

1. **Domain (`backend/src/domain/`)**:
   * **Entities**: Modelos de datos principales (ej. `HealthReport`).
   * **Repositories**: Interfaces o contratos que detallan el comportamiento de almacenamiento (ej. `HealthRepository.ts`). No depende de ninguna base de datos específica.
   
2. **Use Cases (`backend/src/use-cases/`)**:
   * Contiene las reglas y lógica de la aplicación (ej. `GetHealthReport.ts`). Orquesta el flujo desde y hacia las entidades usando los repositorios abstractos.

3. **Interfaces (`backend/src/interfaces/`)**:
   * **Controllers**: Recibe las solicitudes HTTP de Express, las adapta y llama a los Use Cases correspondientes.
   * **Routes**: Define las rutas del servidor y las asocia a sus controladores.

4. **Infrastructure (`backend/src/infrastructure/`)**:
   * Detalles técnicos como la conexión a la base de datos PostgreSQL (`db.ts`), implementaciones concretas de repositorios (`PostgresHealthRepository.ts`) y la configuración del servidor Express.

---

## 🚀 Cómo Iniciar el Proyecto

### 1. Requisitos Previos
Asegúrate de tener instalado **Node.js** (versión 18 o superior).

### 2. Iniciar Todo en un Solo Comando
Desde la raíz del proyecto, puedes ejecutar ambos servidores (backend en el puerto `5000` y frontend) de forma simultánea:

```bash
# Iniciar ambos en modo desarrollo
npm run dev
```

### 3. Ejecutar de Forma Individual

* **Para el Backend**:
  ```bash
  cd backend
  npm run dev
  ```
* **Para el Frontend**:
  ```bash
  cd frontend
  npm run dev
  ```

---

## 🔌 Base de Datos
El backend ya está configurado con la cadena de conexión externa hacia tu base de datos **PostgreSQL** alojada en **Render**.
Puedes revisar la configuración de conexión en:
* [backend/.env](file:///Users/guillermoayestas/Documents/unah%20conecta/backend/.env)
* [backend/src/infrastructure/database/db.ts](file:///Users/guillermoayestas/Documents/unah%20conecta/backend/src/infrastructure/database/db.ts)
