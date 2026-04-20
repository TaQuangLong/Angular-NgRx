using MediatR;
using VerticalSlice.API.Common.Results;

namespace VerticalSlice.API.Features.Products.CreateProduct;

public sealed class CreateProductHandler : IRequestHandler<CreateProductCommand, Result<ProductDto>>
{
    private static int _nextId = 4;

    public Task<Result<ProductDto>> Handle(
        CreateProductCommand request,
        CancellationToken cancellationToken)
    {
        var product = new ProductDto(
            _nextId++,
            request.Name,
            request.Description,
            request.Price);

        Result<ProductDto> result = product;
        return Task.FromResult(result);
    }
}
