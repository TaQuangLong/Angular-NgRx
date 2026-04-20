using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Serilog;
using VerticalSlice.API.Common.Behaviors;
using VerticalSlice.API.Common.Endpoints;
using VerticalSlice.API.Common.Exceptions;
using VerticalSlice.API.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// ─── Logging ────────────────────────────────────────────────────────────────
builder.Host.UseSerilog((context, loggerConfig) =>
    loggerConfig.ReadFrom.Configuration(context.Configuration));

// ─── OpenAPI ─────────────────────────────────────────────────────────────────
builder.Services.AddOpenApi();

// ─── Global Exception Handling ───────────────────────────────────────────────
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// ─── MediatR (handlers + pipeline behaviors) ─────────────────────────────────
builder.Services.AddMediatR(config =>
{
    config.RegisterServicesFromAssembly(typeof(Program).Assembly);
    config.AddOpenBehavior(typeof(LoggingBehavior<,>));
    config.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

// ─── Validation ──────────────────────────────────────────────────────────────
builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);

// ─── EF Core / SQL Server ────────────────────────────────────────────────────
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ─── CORS ─────────────────────────────────────────────────────────────────────
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins").Get<string[]>() ?? ["http://localhost:4200"];

builder.Services.AddCors(options =>
    options.AddPolicy("Angular", policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()));

// ─── Build ───────────────────────────────────────────────────────────────────
var app = builder.Build();

// ─── Auto-apply pending migrations at startup ────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
}

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseCors("Angular");
app.UseHttpsRedirection();
app.UseSerilogRequestLogging();

// ─── Auto-discover and register all IEndpoint implementations ────────────────
typeof(Program).Assembly
    .GetTypes()
    .Where(t => typeof(IEndpoint).IsAssignableFrom(t) && t is { IsInterface: false, IsAbstract: false })
    .Select(Activator.CreateInstance)
    .Cast<IEndpoint>()
    .ToList()
    .ForEach(e => e.MapEndpoint(app));

app.Run();

