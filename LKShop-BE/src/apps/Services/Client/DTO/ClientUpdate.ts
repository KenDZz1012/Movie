import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export default class ClientUpdate {

    @IsString()
    @IsOptional()
    public UserName: string

    @IsString()
    @IsOptional()
    public Password: string

    @IsEmail()
    @IsOptional()
    public Email: string

    @IsString()
    @IsOptional()
    public Avatar: string

    @IsBoolean()
    @IsOptional()
    public IsPayment: Boolean

    @IsString()
    @IsOptional()
    public Quality: string

    @IsArray()
    @IsOptional()
    public LastWatchMovie: Array<string>

    @IsString()
    @IsOptional()
    public LastWatchMovieString: string

    @IsArray()
    @IsOptional()
    public MovieList: Array<string>

    @IsString()
    @IsOptional()
    public Bundle: string
}
