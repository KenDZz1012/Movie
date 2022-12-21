import { IsArray, IsBoolean, IsDate, IsOptional, IsString, IsNumber } from "class-validator"

export default class MovieUpdate {

    @IsString()
    @IsOptional()
    public MovieName: string

    @IsArray()
    @IsOptional()
    public Category: string

    @IsArray()
    @IsOptional()
    public Director: string

    @IsArray()
    @IsOptional()
    public Actor: string

    @IsString()
    @IsOptional()
    public Country: string

    @IsString()
    @IsOptional()
    public Type: string

    @IsString()
    @IsOptional()
    public Poster: string

    @IsString()
    @IsOptional()
    public CoverPoster: string

    @IsString()
    @IsOptional()
    public Description: string

    @IsString()
    @IsOptional()
    public RunTime: string

    @IsNumber()
    @IsOptional()
    public Rating: number

    @IsNumber()
    @IsOptional()
    public RateCount: number

    @IsNumber()
    @IsOptional()
    public ViewCount: number

    @IsNumber()
    @IsOptional()
    public YearProduce: number

    @IsString()
    @IsOptional()
    public Trailer: string

    @IsString()
    @IsOptional()
    public Video: string

    @IsBoolean()
    @IsOptional()
    public IsTrending: boolean

    @IsString()
    @IsOptional()
    public Status: string

    @IsNumber()
    @IsOptional()
    public Season: number

    @IsDate()
    @IsOptional()
    public CreatedTime: Date
}