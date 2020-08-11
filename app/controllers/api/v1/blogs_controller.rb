class Api::V1::BlogsController < ApplicationController
    before_action :find_blog, except: [:index, :new, :create]

    def index
        @blogs = Blog.all.order(created_at: :desc)
        render json: @blogs
    end

    def show
        if @blog
            render json: @blog
        else
            render json: @blog.errors
        end
    end

    def new
        @blog = Blog.new
        render json: @blog
    end

    def create
        debugger
        @blog = Blog.create!(blog_params)
        if @blog
            render json: @blog
        else
            render json: @blog.errors
        end
    end

    def edit
    end

    def update
        if @blog.update(blog_params)
            render json: @blog
        else
            render json: @blog.errors
        end
    end

    def delete
        if @blog.destroy
            render json: { message: 'Blog deleted!' }
        else
            render json: @blog.error
        end
    end

    private

    def find_blog
        @blog = Blog.find(params[:id])
    end

    def blog_params
        params.require(:blog).permit(:title, :author, :content, :image)
    end
end