using MediatR;
using VerticalSlice.API.Common.Endpoints;
using VerticalSlice.API.Common.Extensions;

namespace VerticalSlice.API.Features.Customers.CreateCustomer;

public sealed class CreateCustomerEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/customers", async (
            CreateCustomerCommand command,
            IMediator mediator,
            CancellationToken ct) =>
        {
            var result = await mediator.Send(command, ct);

            return result.IsSuccess
                ? Results.Created($"/api/customers/{result.Value}", new { id = result.Value })
                : result.ToHttpResult();
        })
        .WithName("CreateCustomer")
        .WithTags("Customers")
        .WithSummary("Save customer information collected from the onboarding wizard");
    }
}
