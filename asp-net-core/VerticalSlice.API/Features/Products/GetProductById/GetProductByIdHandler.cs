using MediatR;
using VerticalSlice.API.Common.Errors;
using VerticalSlice.API.Common.Results;

namespace VerticalSlice.API.Features.Products.GetProductById;

public sealed class GetProductByIdHandler : IRequestHandler<GetProductByIdQuery, Result<ProductDto>>
{
    private static readonly List<ProductDto> Store =
    [
        new(1, "Laptop",   "High-performance laptop",      1299.99m),
        new(2, "Mouse",    "Wireless ergonomic mouse",        49.99m),
        new(3, "Keyboard", "Mechanical keyboard",            129.99m),
    ];

    public Task<Result<ProductDto>> Handle(
        GetProductByIdQuery request,
        CancellationToken cancellationToken)
    {
        var product = Store.FirstOrDefault(p => p.Id == request.Id);

        if (product is null)
        {
            Result<ProductDto> notFound = Error.NotFound(
                "Product.NotFound",
                $"Product with id '{request.Id}' was not found.");

            return Task.FromResult(notFound);
        }

        Result<ProductDto> result = product;
        return Task.FromResult(result);
    }
}
