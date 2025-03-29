import React from 'react';
import { Modal, Form, Input, Upload, Button, Space, Divider, InputNumber, Row, Col, Typography } from 'antd';
import { PlusOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const RecipeFormModal = ({ 
  visible, 
  onCancel, 
  onSubmit, 
  form, 
  editingRecipe, 
  fileList, 
  onUploadChange ,
  submitting
}) => {
  return (
    <Modal
      title={
        <div className="modal-title">
          <Title level={4}>{editingRecipe ? "Editar Receta" : "Agregar Receta"}</Title>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
      centered
      destroyOnClose
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onSubmit}
        requiredMark="optional"
        validateMessages={{
          required: '${label} es obligatorio'
        }}
      >
        <Form.Item
          name="title"
          label="Nombre de la receta"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ej: Ensalada Mediterránea" maxLength={50} />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="Descripción"
          rules={[{ required: true }]}
        >
          <TextArea 
            placeholder="Breve descripción de la receta" 
            autoSize={{ minRows: 2, maxRows: 4 }}
            maxLength={200}
            showCount
          />
        </Form.Item>
        
        <Form.Item
          name="image"
          label="Imagen"
          rules={[{ required: !editingRecipe }]}
          extra="Sube una imagen atractiva de tu receta"
        >
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            fileList={fileList}
            onChange={onUploadChange}
            maxCount={1}
          >
            {fileList.length === 0 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Subir</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        
        <Divider orientation="left">Información nutricional</Divider>
        
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name={['macros', 'proteinas']}
              label="Proteínas (g)"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} placeholder="0" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={['macros', 'grasas']}
              label="Grasas (g)"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} placeholder="0" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={['macros', 'carbohidratos']}
              label="Carbohidratos (g)"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} placeholder="0" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item 
          name="preparationTime" 
          label="Tiempo de Preparación" 
          rules={[{ required: true }]}
        >
          <Input placeholder="Ej: 30 minutos" prefix={<ClockCircleOutlined />} />
        </Form.Item>
        
        <Form.Item 
          name="ingredients" 
          label="Ingredientes" 
          rules={[{ required: true }]}
          extra="Añade todos los ingredientes necesarios (separados por comas o líneas nuevas)"
        >
          <TextArea 
            placeholder="Escribe los ingredientes, uno por línea o separados por comas" 
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        <Form.Item 
          name="steps" 
          label="Pasos de Preparación" 
          rules={[{ required: true }]}
          extra="Describe cada paso de la preparación en orden (uno por línea)"
        >
          <TextArea 
            placeholder="1. Lava las verduras\n2. Corta los ingredientes..." 
            autoSize={{ minRows: 4, maxRows: 8 }}
          />
        </Form.Item>
        
        <Form.Item className="form-buttons">
          <Space>
            <Button onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
  {editingRecipe ? "Actualizar" : "Agregar"}
</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RecipeFormModal;
