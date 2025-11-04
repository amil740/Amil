# AcademyApp - Layered Architecture

## Project Structure

```
AcademyApp/
│
├── Core Layer
│   ├── AcademyApp.Core.Entities/
│   │   └── Group.cs (Domain Entity)
│   │
│   └── AcademyApp.Core.Interfaces/
│       ├── IGroupRepository.cs
│       ├── IGroupService.cs
│   └── IUnitOfWork.cs
│
├── Infrastructure Layer
│   └── AcademyApp.Infrastructure.Data/
│       ├── AcademyDbContext.cs (EF Core DbContext)
│       ├── GroupRepository.cs (Repository Pattern)
│    └── UnitOfWork.cs (Unit of Work Pattern)
│
├── Application Layer
│   └── AcademyApp.Application.Services/
│       └── GroupService.cs (Business Logic)
│
├── Business Logic Layer (Wrapper)
│   └── AcademyApp.BLL/
│       └── DTOs/ (Data Transfer Objects)
│
├── Data Access Layer (Legacy)
│   └── AcademyApp.DLL/
│       └── DTOs/ (Data Transfer Objects)
│
└── Presentation Layer
    └── AcademyApp.PL/ (Console/UI Application)
```

## Architecture Overview

### 1. **Core Layer**
   - **AcademyApp.Core.Entities**: Pure domain entities (no dependencies)
   - **AcademyApp.Core.Interfaces**: Repository and Service interfaces (contracts)

### 2. **Infrastructure Layer**
   - **AcademyApp.Infrastructure.Data**: EF Core implementation
  - `AcademyDbContext`: Database context
     - `GroupRepository`: Implements `IGroupRepository`
     - `UnitOfWork`: Implements `IUnitOfWork` (manages transactions)

### 3. **Application Layer**
   - **AcademyApp.Application.Services**: Business logic implementation
     - `GroupService`: Implements `IGroupService`
     - Orchestrates repository calls and business rules

### 4. **Presentation Layer**
   - **AcademyApp.PL**: Entry point (Console or Web UI)
   - Depends on: Core.Interfaces, Application.Services

## Dependency Flow

```
PL → Application.Services → Infrastructure.Data
     ↓             ↓
   Core.Interfaces    →  Core.Entities
```

## Design Patterns Used

1. **Repository Pattern**: Abstracts data access logic
2. **Unit of Work Pattern**: Manages transactions and repositories
3. **Dependency Injection**: Loose coupling between layers
4. **Service Layer Pattern**: Business logic separation
5. **DTO Pattern**: Data transfer between layers

## Key Features

- ✅ Separation of Concerns
- ✅ Testability (each layer can be tested independently)
- ✅ Maintainability (clear dependencies)
- ✅ Scalability (easy to add new entities and services)
- ✅ Reusability (services can be used across different UIs)

## Usage Example

```csharp
// In Program.cs or ConfigureServices
var services = new ServiceCollection();

// Register DbContext
services.AddDbContext<AcademyDbContext>(options =>
    options.UseSqlServer(connectionString));

// Register Infrastructure
services.AddScoped<IUnitOfWork, UnitOfWork>();
services.AddScoped<IGroupRepository>(sp => 
  sp.GetRequiredService<IUnitOfWork>().GroupRepository);

// Register Application Services
services.AddScoped<IGroupService, GroupService>();

// Now inject IGroupService in your PL
```

## Code Change Example

```csharp
// Instead of: var repo = new GroupRepository(context); // ❌ Tight coupling
// Do this: ✅ Inject the interface
var services = new ServiceCollection();
services.AddScoped<IGroupRepository, GroupRepository>();
services.AddScoped<IGroupService, GroupService>();
