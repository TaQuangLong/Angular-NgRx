namespace VerticalSlice.API.Common.Errors;

public record Error(string Code, string Description, ErrorType Type = ErrorType.Failure)
{
    public static readonly Error None = new(string.Empty, string.Empty, ErrorType.None);

    public static Error NotFound(string code, string description) =>
        new(code, description, ErrorType.NotFound);

    public static Error Validation(string code, string description) =>
        new(code, description, ErrorType.Validation);

    public static Error Conflict(string code, string description) =>
        new(code, description, ErrorType.Conflict);

    public static Error Problem(string code, string description) =>
        new(code, description, ErrorType.Failure);
}

public enum ErrorType
{
    None,
    NotFound,
    Validation,
    Conflict,
    Failure
}
