# Program.cs - Complete Implementation

## Overview
The `Program.cs` file has been completely refactored to include:
- ? Full Dependency Injection (DI) configuration
- ? EF Core DbContext setup with SQL Server
- ? Service layer integration
- ? Repository pattern implementation
- ? Example methods demonstrating CRUD operations

## Architecture Setup

### 1. Dependency Injection Container
```csharp
var services = new ServiceCollection();
```
Creates a new DI container to manage service lifetimes and dependencies.

### 2. DbContext Configuration
```csharp
services.AddDbContext<AcademyDbContext>(options =>
    options.UseSqlServer("Server=Amil;Database=AcademyDb;Trusted_Connection=True;TrustServerCertificate=True;"));
```
- Configures Entity Framework Core with SQL Server
- Uses your existing connection string
- Registered as **Scoped** (new instance per request)

### 3. Infrastructure Layer Registration
```csharp
services.AddScoped<IUnitOfWork, UnitOfWork>();
services.AddScoped<IGroupRepository>(sp => sp.GetRequiredService<IUnitOfWork>().GroupRepository);
```
- Registers Unit of Work pattern
- Makes repositories available through UnitOfWork
- Scoped lifetime (best for database operations)

### 4. Application Services Registration
```csharp
services.AddScoped<IGroupService, GroupService>();
```
- Registers business logic service layer
- GroupService handles all group-related operations
- Depends on IUnitOfWork for data access

### 5. Service Provider Creation
```csharp
var serviceProvider = services.BuildServiceProvider();
var groupService = serviceProvider.GetRequiredService<IGroupService>();
```
- Builds the DI container
- Retrieves the configured service for use

## Example Methods

### ?? CreateGroupExample
Creates a new group in the database.
```
Input: Group object with Name, Description, Limit
Output: Created group with assigned ID
```

### ?? GetAllGroupsExample
Retrieves all groups from the database.
```
Input: None
Output: List of all groups
```

### ?? GetGroupByIdExample
Retrieves a specific group by ID.
```
Input: Group ID
Output: Group object or null if not found
```

### ?? UpdateGroupExample
Updates an existing group's properties.
```
Input: Group ID with updated properties
Output: Updated group
```

### ??? DeleteGroupExample
Deletes a group from the database.
```
Input: Group ID
Output: Boolean success status
```

## Data Flow

```
Program.cs (Entry Point)
    ?
IGroupService (Business Logic)
    ?
IGroupRepository (Data Access)
    ?
AcademyDbContext (EF Core)
    ?
SQL Server Database
```

## Service Lifetimes

| Service | Lifetime | Why |
|---------|----------|-----|
| DbContext | Scoped | Each operation gets fresh context, automatic cleanup |
| IUnitOfWork | Scoped | Same context instance within a scope |
| IGroupRepository | Scoped | Shares DbContext instance |
| IGroupService | Scoped | Coordinates repository operations |

## Running the Application

```bash
dotnet run
```

Expected Output:
```
=== Academy App - Group Management ===

?? Creating a new group...
? Group created: ID=1, Name=Grade 10-A

?? Fetching all groups...
Found 1 group(s):
  - ID: 1, Name: Grade 10-A, Limit: 40

?? Fetching group by ID (ID=1)...
? Found: Grade 10-A - Mathematics and Science stream

?? Updating group (ID=1)...
? Group updated: Grade 10-A, New Limit: 45

??? Deleting group (ID=1)...
? Group deleted successfully.

=== Operations Complete ===
```

## Key Features

? **Clean Architecture**: Separation of concerns across layers
? **Dependency Injection**: Loose coupling, easy to test
? **SOLID Principles**: Following all SOLID guidelines
? **Error Handling**: Try-catch blocks with user-friendly messages
? **Repository Pattern**: Abstracts data access logic
? **Unit of Work Pattern**: Manages transactions
? **Async/Await**: All operations are asynchronous

## Next Steps

1. **Create Database**: Run EF Core migrations
   ```bash
   dotnet ef database update
   ```

2. **Add More Entities**: Follow the same pattern for other entities

3. **Implement Authentication**: Add user authorization layer

4. **Add Validation**: Implement business rule validation

5. **Error Logging**: Add logging framework (Serilog, NLog)
