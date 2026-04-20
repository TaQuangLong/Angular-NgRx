using VerticalSlice.API.Common.Errors;
using VerticalSlice.API.Common.Results;
using Http = Microsoft.AspNetCore.Http.Results;

namespace VerticalSlice.API.Common.Extensions;

public static class ResultExtensions
{
    public static IResult ToHttpResult<T>(this Result<T> result)
    {
        return result.IsSuccess
            ? Http.Ok(result.Value)
            : MapError(result.Error);
    }

    public static IResult ToCreatedResult<T>(this Result<T> result, string location)
    {
        return result.IsSuccess
            ? Http.Created(location, result.Value)
            : MapError(result.Error);
    }

    private static IResult MapError(Error error) => error.Type switch
    {
        ErrorType.NotFound => Http.Problem(
            detail: error.Description,
            statusCode: StatusCodes.Status404NotFound,
            title: error.Code),

        ErrorType.Validation => Http.Problem(
            detail: error.Description,
            statusCode: StatusCodes.Status422UnprocessableEntity,
            title: error.Code),

        ErrorType.Conflict => Http.Problem(
            detail: error.Description,
            statusCode: StatusCodes.Status409Conflict,
            title: error.Code),

        _ => Http.Problem(
            detail: error.Description,
            statusCode: StatusCodes.Status500InternalServerError,
            title: error.Code)
    };
}
