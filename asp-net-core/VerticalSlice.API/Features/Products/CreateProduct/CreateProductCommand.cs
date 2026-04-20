using MediatR;
using VerticalSlice.API.Common.Results;

namespace VerticalSlice.API.Features.Products.CreateProduct;

public sealed record CreateProductCommand(
    string Name,
    string Description,
    decimal Price) : IRequest<Result<ProductDto>>;
