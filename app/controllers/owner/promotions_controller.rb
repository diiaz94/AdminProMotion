class Owner::PromotionsController < ApplicationController
  before_action :require_owner_login
  before_action :set_promotion, only: [:show, :edit, :update, :destroy]
  before_action :set_store

  # GET /promotions
  # GET /promotions.json
  def index
    @promotions = @store.promotions
  end

  # GET /promotions/1
  # GET /promotions/1.json
  def show
    @promotions = @store.promotions
    render "index"
  end

  # GET /promotions/new
  def new
    @promotion = Promotion.new

  end

  # GET /promotions/1/edit
  def edit
  end

  # POST /promotions
  # POST /promotions.json
  def create
    @promotion = Promotion.new(promotion_params)
    @promotion.store=@store
    respond_to do |format|
      if @promotion.save
        format.html { redirect_to owner_commerce_store_promotions_path, notice: 'Promoción creada exitosamente.' }
        format.json { render :show, status: :created, location: @promotion }
      else
        format.html { render :new }
        format.json { render json: @promotion.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /promotions/1
  # PATCH/PUT /promotions/1.json
  def update
    respond_to do |format|
      @promotion.slug=nil
      if @promotion.update(promotion_params)
        format.html { redirect_to owner_commerce_store_promotions_path, notice: 'Promoción actualizada exitosamente.' }
        msg = { :status => "ok", :message => "Success!", :promotion => @promotion }
        format.json  { render :json => msg } # don't do msg.to_json
      else
        format.html { render :edit }
        format.json { render json: @promotion.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /promotions/1
  # DELETE /promotions/1.json
  def destroy
    @promotion.destroy
    respond_to do |format|
      format.html { redirect_to promotions_url, notice: 'Promotion was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_promotion
      @promotion = Promotion.friendly.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def promotion_params
      params.require(:promotion).permit(:title, :description, :picture, :price,:until,:active)
    end
end
