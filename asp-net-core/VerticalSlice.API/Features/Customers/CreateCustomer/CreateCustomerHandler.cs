using MediatR;
using VerticalSlice.API.Common.Results;
using VerticalSlice.API.Infrastructure.Entities;
using VerticalSlice.API.Infrastructure.Persistence;

namespace VerticalSlice.API.Features.Customers.CreateCustomer;

public sealed class CreateCustomerHandler : IRequestHandler<CreateCustomerCommand, Result<int>>
{
    private readonly AppDbContext _db;

    public CreateCustomerHandler(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Result<int>> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
    {
        var customer = new Customer
        {
            Name = request.Name,
            Address = request.Address,
            Gender = request.Gender,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            CreatedAt = DateTime.UtcNow,
        };

        _db.Customers.Add(customer);
        await _db.SaveChangesAsync(cancellationToken);

        return customer.Id;
    }
}
