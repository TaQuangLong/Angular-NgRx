using MediatR;
using VerticalSlice.API.Common.Results;

namespace VerticalSlice.API.Features.Products.GetProductById;

public sealed record GetProductByIdQuery(int Id) : IRequest<Result<ProductDto>>;
