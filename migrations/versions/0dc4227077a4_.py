"""empty message

Revision ID: 0dc4227077a4
Revises: 9fcfa773ef84
Create Date: 2022-02-27 09:14:39.162011

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0dc4227077a4'
down_revision = '9fcfa773ef84'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('post_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'comments', 'posts', ['post_id'], ['id'])
    op.add_column('subcomments', sa.Column('comment_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'subcomments', 'comments', ['comment_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'subcomments', type_='foreignkey')
    op.drop_column('subcomments', 'comment_id')
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.drop_column('comments', 'post_id')
    # ### end Alembic commands ###