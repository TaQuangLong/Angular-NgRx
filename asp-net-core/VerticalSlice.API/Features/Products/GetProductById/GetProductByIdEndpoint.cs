using MediatR;
using VerticalSlice.API.Common.Endpoints;
using VerticalSlice.API.Common.Extensions;

namespace VerticalSlice.API.Features.Products.GetProductById;

public sealed class GetProductByIdEndpoint : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/products/{id:int}", async (int id, IMediator mediator, CancellationToken ct) =>
        {
            var result = await mediator.Send(new GetProductByIdQuery(id), ct);
            return result.ToHttpResult();
        })
        .WithName("GetProductById")
        .WithTags("Products")
        .WithSummary("Get a product by ID");
    }
}
