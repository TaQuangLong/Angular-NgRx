using MediatR;
using VerticalSlice.API.Common.Endpoints;
using VerticalSlice.API.Common.Extensions;

namespace VerticalSlice.API.Features.Products.CreateProduct;

public sealed class CreateProductEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/products", async (
            CreateProductCommand command,
            IMediator mediator,
            CancellationToken ct) =>
        {
            var result = await mediator.Send(command, ct);

            return result.IsSuccess
                ? Results.Created($"/api/products/{result.Value.Id}", result.Value)
                : result.ToHttpResult();
        })
        .WithName("CreateProduct")
        .WithTags("Products")
        .WithSummary("Create a new product");
    }
}
