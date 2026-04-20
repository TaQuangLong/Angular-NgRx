using MediatR;
using VerticalSlice.API.Common.Results;

namespace VerticalSlice.API.Features.Products.GetProducts;

public sealed record GetProductsQuery : IRequest<Result<List<ProductDto>>>;
