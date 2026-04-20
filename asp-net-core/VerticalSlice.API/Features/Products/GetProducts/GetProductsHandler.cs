using MediatR;
using VerticalSlice.API.Common.Results;

namespace VerticalSlice.API.Features.Products.GetProducts;

public sealed class GetProductsHandler : IRequestHandler<GetProductsQuery, Result<List<ProductDto>>>
{
    // Simulated in-memory store – replace with real data access
    private static readonly List<ProductDto> Store =
    [
        new(1, "Laptop",   "High-performance laptop",      1299.99m),
        new(2, "Mouse",    "Wireless ergonomic mouse",        49.99m),
        new(3, "Keyboard", "Mechanical keyboard",            129.99m),
    ];

    public Task<Result<List<ProductDto>>> Handle(
        GetProductsQuery request,
        CancellationToken cancellationToken)
    {
        Result<List<ProductDto>> result = Store.ToList();
        return Task.FromResult(result);
    }
}
