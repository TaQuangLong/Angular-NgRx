using MediatR;
using VerticalSlice.API.Common.Results;

namespace VerticalSlice.API.Features.Customers.CreateCustomer;

public sealed record CreateCustomerCommand(
    string Name,
    string Address,
    string Gender,
    string Email,
    string PhoneNumber) : IRequest<Result<int>>;
