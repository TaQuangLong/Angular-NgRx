using MediatR;
using VerticalSlice.API.Common.Endpoints;
using VerticalSlice.API.Common.Extensions;

namespace VerticalSlice.API.Features.Products.GetProducts;

public sealed class GetProductsEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/products", async (IMediator mediator, CancellationToken ct) =>
        {
            var result = await mediator.Send(new GetProductsQuery(), ct);
            return result.ToHttpResult();
        })
        .WithName("GetProducts")
        .WithTags("Products")
        .WithSummary("Get all products");
    }
}
