require 'test_helper'

class MottosControllerTest < ActionController::TestCase
  setup do
    @motto = mottos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:mottos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create motto" do
    assert_difference('Motto.count') do
      post :create, motto: { content: @motto.content, downloaded_at: @motto.downloaded_at, remote_image_url: @motto.remote_image_url }
    end

    assert_redirected_to motto_path(assigns(:motto))
  end

  test "should show motto" do
    get :show, id: @motto
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @motto
    assert_response :success
  end

  test "should update motto" do
    patch :update, id: @motto, motto: { content: @motto.content, downloaded_at: @motto.downloaded_at, remote_image_url: @motto.remote_image_url }
    assert_redirected_to motto_path(assigns(:motto))
  end

  test "should destroy motto" do
    assert_difference('Motto.count', -1) do
      delete :destroy, id: @motto
    end

    assert_redirected_to mottos_path
  end
end
